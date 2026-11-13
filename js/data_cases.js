/**
 * BARCHA 85 TA VAZIYATLI MASALALAR VA ULARNING TO'LIQ YECHIMLARI
 */

window.HISTO_CASES = [
  ...(window.HISTO_CASES_P1 || []),
  ...(window.HISTO_CASES_P2 || []),
  ...(window.HISTO_CASES_P3 || [])
];

console.log("Histology 85 Cases loaded:", window.HISTO_CASES.length);
