/**
 * 51 TA MIKROSKOPIK PREPARATLAR RO'YXATI VA TAVSIFI
 * Rasmiy kafedra ro'yxati va "X preparatlar0..pptx" ma'lumotlari bilan to'liq boyitilgan
 */

window.HISTO_PREPARATIONS = [
  ...(window.HISTO_PREP_P1 || []),
  ...(window.HISTO_PREP_P2 || [])
];

// Atlas va taqdimot ma'lumotlarini har bir preparatga biriktirish
if (window.HISTO_ATLAS_DATA) {
  window.HISTO_PREPARATIONS.forEach(p => {
    const a = window.HISTO_ATLAS_DATA[p.id];
    if (a) {
      if (a.fig) p.atlas_fig = a.fig;
      if (a.pointers) p.atlas_pointers = a.pointers;
      if (a.desc) p.atlas_desc = a.desc;
      if (a.stain && (!p.staining || p.staining.length < 5)) p.staining = a.stain;
    }
  });
}

console.log("Histology 51 Preparations loaded:", window.HISTO_PREPARATIONS.length);
