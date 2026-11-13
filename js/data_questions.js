/**
 * BARCHA 111 TA OG'ZAKI IMTIHON SAVOLLARI VA JAVOBLARI TO'PLAMI
 */

window.HISTO_QUESTIONS = [
  ...(window.HISTO_Q_PART1 || []),
  ...(window.HISTO_Q_PART2 || []),
  ...(window.HISTO_Q_PART3 || []),
  ...(window.HISTO_Q_PART4 || [])
];

console.log("Histology 111 Questions loaded:", window.HISTO_QUESTIONS.length);
