/**
 * Booking / appointment. On submit we build a real calendar event:
 *   - a downloadable .ics (Apple Calendar, Outlook, etc.)
 *   - a one-click "Add to Google Calendar" template link
 * No backend or login needed — perfect for the demo. The visit is a 1-hour
 * slot at the requested date/time.
 */

const BUSINESS = 'Old English Bricklayer';
const DEFAULT_LOC = '39 Humber Way, Langley, Slough SL3 8SR';

// Format a Date as UTC calendar stamp: 20260715T090000Z
function stamp(d) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function buildEvent(fields) {
  const start = new Date(`${fields.date}T${fields.time}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const title = `${BUSINESS}: free estimate visit`;
  const details =
    `Brickwork estimate visit.\n` +
    `Service: ${fields.service}\n` +
    `Name: ${fields.name}\nPhone: ${fields.phone}\n` +
    `Booked via oldenglishbricklayer.co.uk`;
  const location = fields.address?.trim() || DEFAULT_LOC;
  return { start, end, title, details, location };
}

function icsBlob(ev) {
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Old English Bricklayer//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@oldenglishbricklayer`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(ev.start)}`,
    `DTEND:${stamp(ev.end)}`,
    `SUMMARY:${ev.title}`,
    `DESCRIPTION:${ev.details.replace(/\n/g, '\\n')}`,
    `LOCATION:${ev.location.replace(/,/g, '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
}

function gcalUrl(ev) {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${stamp(ev.start)}/${stamp(ev.end)}`,
    details: ev.details,
    location: ev.location,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export function initBooking() {
  const form = document.getElementById('booking');
  if (!form) return;

  // Default the date to tomorrow, and block past dates.
  const dateInput = form.querySelector('#book-date');
  const tomorrow = new Date(Date.now() + 864e5);
  const iso = tomorrow.toISOString().slice(0, 10);
  dateInput.min = new Date().toISOString().slice(0, 10);
  dateInput.value = iso;

  const done = document.getElementById('booking-done');
  const summary = document.getElementById('booking-summary');
  const gcal = document.getElementById('gcal-link');
  const ics = document.getElementById('ics-link');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.phone || !data.date) return;

    const ev = buildEvent(data);
    const when = ev.start.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long',
    });

    summary.innerHTML =
      `Thanks <strong>${data.name.split(' ')[0]}</strong>, we&rsquo;ve got you down for ` +
      `<strong>${when} at ${data.time}</strong> for ${data.service.toLowerCase()}. ` +
      `We&rsquo;ll call ${data.phone} to confirm.`;

    gcal.href = gcalUrl(ev);
    ics.href = icsBlob(ev);

    // Save booking locally so the demo "remembers" it.
    const key = 'oeb_bookings_v1';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push({ ...data, created: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));

    form.querySelectorAll('.field, .booking__grid, button[type="submit"]').forEach(
      (el) => (el.style.display = 'none'));
    done.hidden = false;
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('booking-reset')?.addEventListener('click', () => {
    form.reset();
    dateInput.value = iso;
    done.hidden = true;
    form.querySelectorAll('.field, .booking__grid, button[type="submit"]').forEach(
      (el) => (el.style.display = ''));
  });
}
