/**
 * Free-estimate calculator. Produces an *indicative* range from four inputs.
 * Rates are ballpark UK bricklaying figures (labour + materials, ex-VAT) and
 * intentionally conservative — the copy makes clear it's a guide, not a quote.
 */

// Base £ per m² (or per m² equivalent) by job type, [low, high].
const RATES = {
  wall:      [140, 190],
  repoint:   [55, 95],
  paving:    [90, 140],
  extension: [160, 230],
  repair:    [120, 200], // small jobs carry a higher effective rate
};

// Minimum realistic charge to turn up and do a job.
const MIN_JOB = { wall: 900, repoint: 600, paving: 800, extension: 1500, repair: 350 };

const FINISH = { standard: 1, premium: 1.28 };
const ACCESS = { easy: 1, tight: 1.15 };

// Round to the nearest £50 and format, e.g. 1737 -> "£1,750".
const gbp = (n) => '£' + (Math.round(n / 50) * 50).toLocaleString('en-GB');

function read(form) {
  return {
    job: form.querySelector('input[name="job"]:checked').value,
    size: Number(form.querySelector('#size').value),
    finish: form.querySelector('input[name="finish"]:checked').value,
    access: form.querySelector('input[name="access"]:checked').value,
  };
}

const HINTS = {
  wall: 'A guess is fine — length × height for walls.',
  repoint: 'Roughly the wall area being raked out and repointed.',
  paving: 'The area to be paved, in square metres.',
  extension: 'Approx external wall area of the brickwork.',
  repair: 'Small area — even 1–2 m² is fine.',
};

export function initCalculator() {
  const form = document.getElementById('calc');
  if (!form) return;

  const size = form.querySelector('#size');
  const sizeOut = form.querySelector('#sizeOut');
  const sizeHint = form.querySelector('#sizeHint');
  const figure = form.querySelector('#calcFigure');

  function update() {
    const v = read(form);
    sizeOut.textContent = `${v.size} m²`;
    sizeHint.textContent = HINTS[v.job];

    const [lo, hi] = RATES[v.job];
    const mult = FINISH[v.finish] * ACCESS[v.access];
    let low = v.size * lo * mult;
    let high = v.size * hi * mult;

    // Floor to a sensible minimum call-out for the job type.
    low = Math.max(low, MIN_JOB[v.job]);
    high = Math.max(high, MIN_JOB[v.job] * 1.35);

    figure.textContent = `${gbp(low)} – ${gbp(high)}`;
  }

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();
}
