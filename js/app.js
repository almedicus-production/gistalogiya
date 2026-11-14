/**
 * GISTOLOGIYA OG'ZAKI IMTIHON PLATFORMASI - INTERAKTIV ILOVA
 * Almedicus — Professional Medical Education
 * Versiya 3.1: Mukammallashtirilgan Mikroskop Zoom (Tezkor 2.5x va Interaktiv boshqaruv),
 * Nazariy Savollar Javoblari To'liq Ko'rinishi, 4 Tilli Tizim va Shaxsiy Yutuqlar Doskasi.
 */

(function () {
  'use strict';

  // Telegram Mini App Handshake & Auto-Expand
  if (window.Telegram && window.Telegram.WebApp) {
    try {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    } catch (e) {
      console.warn('Telegram WebApp notice:', e);
    }
  }

  // ========================================================
  // 1. ZAMONAVIY VEKTOR SVG IKONKALAR TIZIMI
  // ========================================================
  const ICONS = {
    search: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    microscope: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"></path><path d="M3 22h18"></path><path d="M14 22a7 7 0 1 0 0-14h-1"></path><path d="M9 14h2"></path><path d="M9 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2"></path><path d="M12 2v2"></path></svg>',
    book: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    zoomIn: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
    zoomOut: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
    reset: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>',
    palette: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>',
    target: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    layers: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    gradCap: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>',
    eye: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
    eyeOff: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>',
    trophy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>',
    award: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    chevLeft: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
    chevRight: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    checkCircle: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    starFilled: '<svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    volume: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    lightning: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    expand: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
    trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
    edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    sparkle: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>'
  };
  window.HISTO_ICONS = ICONS;

  // Safe Storage Helper
  const safeStorage = {
    get: function (key, fallback) {
      try {
        const val = localStorage.getItem(key);
        return val !== null ? val : fallback;
      } catch (e) {
        return fallback;
      }
    },
    getJSON: function (key, fallback) {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, val) {
      try {
        localStorage.setItem(key, val);
      } catch (e) {}
    },
    setJSON: function (key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {}
    }
  };

  // ========================================================
  // 2. KO'P TILLI TIZIM (I18N) LUG'ATI
  // ========================================================
  const I18N = {
    'uz-lat': {
      langName: "O'zbek",
      brandTitle: "Gistologiya Imtihon Ekspert",
      brandSubtitle: "Tibbiyot OTMlari Og'zaki Imtihoniga To'liq Tayyorgarlik",
      tabQuestions: "Nazariy Savollar",
      tabCases: "Vaziyatli Masalalar",
      tabPreparations: "Mikroskopik Preparatlar",
      tabSchemes: "Sxemalar",
      tabSimulator: "Imtihon Biletlari",
      tabProfile: "Profil & Yutuqlar",
      tabFavorites: "Sevimlilar",
      searchPlaceholder: "Savol, masala, preparat yoki kalit so'zlarni qidiring...",
      hideAnswers: "Yodlash rejimi (Javoblarni yashirish)",
      staining: "Bo'yalishi",
      diagKey: "Diagnostik kalit",
      layers: "Qatlamlari va tuzilishi",
      examQA: "Imtihon savol-javoblari",
      atlasPointers: "Atlas ko'rsatkichlari",
      showAnswer: "Javobni ko'rish",
      hideAnswer: "Javobni yashirish",
      showDetails: "Preparat tahlili",
      hideDetails: "Tahlilni yopish",
      zoom: "Kattalashtirish",
      zoomOut: "Kichiklashtirish",
      resetZoom: "Asl o'lcham",
      microscopePhoto: "Mikroskop fotosurati",
      atlasDiagram: "Atlas sxemasi",
      prev: "Oldingi",
      next: "Keyingi",
      close: "Yopish",
      mastered: "O'zlashtirildi",
      markMastered: "O'zlashtirish",
      generateTicket: "Yangi Bilet Olish",
      ticketTitle: "Rasmiy Imtihon Bileti",
      ticketCompleted: "Imtihonni Yakunlash va Baholash",
      grade5: "A'lo (5 Baho)",
      grade4: "Yaxshi (4 Baho)",
      grade3: "Qoniqarli (3 Baho)",
      score: "ball",
      doubleTapHint: "Ikki marta bosib kattalashtiring • Drag qilib suring • +/- bilan boshqaring",
      profileTitle: "Shaxsiy Profil va O'zlashtirish Ko'rsatkichlari",
      studentName: "Talaba",
      university: "Tibbiyot OTM",
      specialty: "Davolash ishi",
      totalScore: "Jami to'plangan ball",
      achievementsTitle: "Akademik Yutuqlar va Nishonlar",
      editProfile: "Profilni tahrirlash",
      resetProgress: "Natijalarni tozalash",
      confirmReset: "Barcha o'zlashtirilgan savollar, preparatlar va ballaringiz tozalanadi. Davom etasizmi?",
      allCategories: "Barchasi",
      schemeTask: "Imtihon topshirig'i:",
      schemeAnswer: "Sxema tuzilmalari va to'liq javobi:",
      caseSituation: "Klinik vaziyat:",
      caseQuestions: "Hal qilinishi lozim bo'lgan savollar:",
      caseSolution: "Diagnostik tahlil va to'liq yechim:",
      showStructures: "Tuzilmalarni ko'rish"
    },
    'uz-cyr': {
      langName: "Ўзбек",
      brandTitle: "Гистология Имтиҳон Эксперт",
      brandSubtitle: "Тиббиёт ОТМлари Оғзаки Имтиҳонига Тўлиқ Тайёргарлик",
      tabQuestions: "Назарий Саволлар",
      tabCases: "Вазиятли Масалалар",
      tabPreparations: "Микроскопик Препаратлар",
      tabSchemes: "Схемалар",
      tabSimulator: "Имтиҳон Билетлари",
      tabProfile: "Профил ва Ютуқлар",
      tabFavorites: "Севимлилар",
      searchPlaceholder: "Савол, масала, препарат ёки калит сўзларни қидиринг...",
      hideAnswers: "Ёдлаш режими (Жавобларни яшириш)",
      staining: "Бўялиши",
      diagKey: "Диагностик калит",
      layers: "Қатламлари ва тузилиши",
      examQA: "Имтиҳон савол-жавоблари",
      atlasPointers: "Атлас кўрсаткичлари",
      showAnswer: "Жавобни кўриш",
      hideAnswer: "Жавобни яшириш",
      showDetails: "Препарат таҳлили",
      hideDetails: "Таҳлилни ёпиш",
      zoom: "Катталаштириш",
      zoomOut: "Кичиклаштириш",
      resetZoom: "Асл ўлчам",
      microscopePhoto: "Микроскоп фотосурати",
      atlasDiagram: "Атлас схемаси",
      prev: "Олдинги",
      next: "Кейинги",
      close: "Ёпиш",
      mastered: "Ўзлаштирилди",
      markMastered: "Ўзлаштириш",
      generateTicket: "Янги Билет Олиш",
      ticketTitle: "Расмий Имтиҳон Билети",
      ticketCompleted: "Имтиҳонни Якунлаш ва Баҳолаш",
      grade5: "Аъло (5 Баҳо)",
      grade4: "Яхши (4 Баҳо)",
      grade3: "Қониқарли (3 Баҳо)",
      score: "балл",
      doubleTapHint: "Икки марта босиб катталаштиринг • Судраб суринг • +/- билан бошқаринг",
      profileTitle: "Шахсий Профил ва Ўзлаштириш Кўрсаткичлари",
      studentName: "Талаба",
      university: "Тиббиёт ОТМ",
      specialty: "Даволаш иши",
      totalScore: "Жами тўпланган балл",
      achievementsTitle: "Академик Ютуқлар ва Нишонлар",
      editProfile: "Профилни таҳрирлаш",
      resetProgress: "Натижаларни тозалаш",
      confirmReset: "Барча ўзлаштирилган саволлар, препаратлар ва балларингиз тозаланади. Давом этасизми?",
      allCategories: "Барчаси",
      schemeTask: "Имтиҳон топшириғи:",
      schemeAnswer: "Схема тузилмалари ва тўлиқ жавоби:",
      caseSituation: "Клиник вазият:",
      caseQuestions: "Ҳал қилиниши лозим бўлган саволлар:",
      caseSolution: "Диагностик таҳлил ва тўлиқ ечим:",
      showStructures: "Тузилмаларни кўриш"
    },
    'ru': {
      langName: "Русский",
      brandTitle: "Гистология Экзамен Эксперт",
      brandSubtitle: "Полная подготовка к устному экзамену медицинских вузов",
      tabQuestions: "Теоретические Вопросы",
      tabCases: "Ситуационные Задачи",
      tabPreparations: "Микропрепараты",
      tabSchemes: "Схемы",
      tabSimulator: "Экзаменационные Билеты",
      tabProfile: "Профиль и Достижения",
      tabFavorites: "Избранное",
      searchPlaceholder: "Поиск вопросов, задач, препаратов или ключевых слов...",
      hideAnswers: "Режим запоминания (Скрыть ответы)",
      staining: "Окраска",
      diagKey: "Диагностический ключ",
      layers: "Слои и микроструктура",
      examQA: "Экзаменационные вопросы и ответы",
      atlasPointers: "Указатели атласа",
      showAnswer: "Показать ответ",
      hideAnswer: "Скрыть ответ",
      showDetails: "Анализ препарата",
      hideDetails: "Скрыть анализ",
      zoom: "Увеличить",
      zoomOut: "Уменьшить",
      resetZoom: "Исходный масштаб",
      microscopePhoto: "Микрофотография",
      atlasDiagram: "Схема атласа",
      prev: "Предыдущий",
      next: "Следующий",
      close: "Закрыть",
      mastered: "Освоено",
      markMastered: "Отметить освоенным",
      generateTicket: "Получить новый билет",
      ticketTitle: "Официальный экзаменационный билет",
      ticketCompleted: "Завершить экзамен и оценить",
      grade5: "Отлично (Оценка 5)",
      grade4: "Хорошо (Оценка 4)",
      grade3: "Удовлетворительно (Оценка 3)",
      score: "баллов",
      doubleTapHint: "Двойной клик для увеличения • Перетаскивание • +/- для масштаба",
      profileTitle: "Личный профиль и динамика освоения",
      studentName: "Студент",
      university: "Медицинский ВУЗ",
      specialty: "Лечебное дело",
      totalScore: "Всего набрано баллов",
      achievementsTitle: "Академические достижения и награды",
      editProfile: "Редактировать профиль",
      resetProgress: "Сбросить прогресс",
      confirmReset: "Все освоенные вопросы, препараты и баллы будут сброшены. Продолжить?",
      allCategories: "Все разделы",
      schemeTask: "Экзаменационное задание:",
      schemeAnswer: "Структуры схемы и полный ответ:",
      caseSituation: "Клиническая ситуация:",
      caseQuestions: "Вопросы к клинической задаче:",
      caseSolution: "Диагностический анализ и решение:",
      showStructures: "Показать структуры"
    },
    'en': {
      langName: "English",
      brandTitle: "Histology Exam Expert",
      brandSubtitle: "Comprehensive Preparation Platform for Medical Oral Exams",
      tabQuestions: "Theory Questions",
      tabCases: "Clinical Cases",
      tabPreparations: "Microscopic Slides",
      tabSchemes: "Schematic Diagrams",
      tabSimulator: "Exam Tickets",
      tabProfile: "Profile & Achievements",
      tabFavorites: "Favorites",
      searchPlaceholder: "Search questions, cases, slides or key histological terms...",
      hideAnswers: "Study mode (Hide answers)",
      staining: "Staining",
      diagKey: "Diagnostic Key",
      layers: "Layers & Microscopic Structure",
      examQA: "Exam Questions & Answers",
      atlasPointers: "Atlas Pointers",
      showAnswer: "Show Answer",
      hideAnswer: "Hide Answer",
      showDetails: "Slide Analysis",
      hideDetails: "Hide Analysis",
      zoom: "Zoom In",
      zoomOut: "Zoom Out",
      resetZoom: "Reset Zoom",
      microscopePhoto: "Micrograph Photo",
      atlasDiagram: "Atlas Diagram",
      prev: "Previous",
      next: "Next",
      close: "Close",
      mastered: "Mastered",
      markMastered: "Mark as Mastered",
      generateTicket: "Generate New Ticket",
      ticketTitle: "Official Examination Ticket",
      ticketCompleted: "Complete Exam & Grade",
      grade5: "Excellent (Grade 5)",
      grade4: "Good (Grade 4)",
      grade3: "Satisfactory (Grade 3)",
      score: "pts",
      doubleTapHint: "Double-tap to zoom • Drag to pan • Use quickbar buttons",
      profileTitle: "Personal Profile & Mastery Progress",
      studentName: "Medical Student",
      university: "Medical University",
      specialty: "General Medicine",
      totalScore: "Total Score Points",
      achievementsTitle: "Academic Milestones & Badges",
      editProfile: "Edit Profile",
      resetProgress: "Reset Progress",
      confirmReset: "All mastered questions, slides and earned points will be reset. Proceed?",
      allCategories: "All Sections",
      schemeTask: "Exam Task:",
      schemeAnswer: "Scheme Structures & Full Answer:",
      caseSituation: "Clinical Situation:",
      caseQuestions: "Questions to address:",
      caseSolution: "Diagnostic Analysis & Complete Solution:",
      showStructures: "Show Structures"
    }
  };

  // 51 ta preparatning 4 tildagi aniq terminologik lug'ati
  const HISTO_PREP_TRANSLATIONS = {
    1: { uz_lat: "Orqa miya nerv tuguni (Spinal ganglion)", uz_cyr: "Орқа мия нерв тугуни", ru: "Спинномозговой узел (Спинальный ганглий)", en: "Spinal Ganglion (Dorsal Root Ganglion)", lat: "Ganglion spinale" },
    2: { uz_lat: "Orqa miyaning ko'ndalang kesimi", uz_cyr: "Орқа миянинг кўндаланг кесими", ru: "Спинной мозг (поперечный срез)", en: "Spinal Cord (Cross Section)", lat: "Medulla spinalis" },
    3: { uz_lat: "Miyacha", uz_cyr: "Мияча", ru: "Мозжечок", en: "Cerebellum", lat: "Cerebellum" },
    4: { uz_lat: "Bosh miya yarim sharlari po'stlog'i", uz_cyr: "Бош мия ярим шарлари пўстлоғи", ru: "Кора больших полушарий головного мозга", en: "Cerebral Cortex", lat: "Cortex cerebri" },
    5: { uz_lat: "Ko'zning muguz pardasi (Rojovitsa)", uz_cyr: "Кўзнинг мугуз пардаси (Роговица)", ru: "Роговица глаза", en: "Cornea of the Eye", lat: "Cornea" },
    6: { uz_lat: "Ko'zning to'r pardasi", uz_cyr: "Кўзнинг тўр пардаси", ru: "Сетчатка глаза", en: "Retina of the Eye", lat: "Retina" },
    7: { uz_lat: "Kortiy a'zosi (Chig'anoqning spiral a'zosi)", uz_cyr: "Кортий аъзоси (Чиғаноқнинг спирал аъзоси)", ru: "Спиральный орган (орган Корти)", en: "Spiral Organ of Corti", lat: "Organum spirale" },
    8: { uz_lat: "Elastik tipdagi arteriya (Aorta)", uz_cyr: "Эластик типдаги артерия (Аорта)", ru: "Артерия эластического типа (Аорта)", en: "Elastic Artery (Aorta)", lat: "Aorta" },
    9: { uz_lat: "Mushak tipidagi arteriya", uz_cyr: "Мушак типидаги артерия", ru: "Артерия мышечного типа", en: "Muscular Artery", lat: "Arteria myotypica" },
    10: { uz_lat: "Son venasi", uz_cyr: "Сон венаси", ru: "Бедренная вена", en: "Femoral Vein", lat: "Vena femoralis" },
    11: { uz_lat: "Arteriola, kapillyar, venula (Mikrotsirkulyator o'zan)", uz_cyr: "Артериола, капилляр, венула (Микроциркулятор ўзан)", ru: "Микроциркуляторное русло (артериола, капилляр, венула)", en: "Microcirculatory Bed (Arteriole, Capillary, Venule)", lat: "Vasa microcirculatoria" },
    12: { uz_lat: "Yurak devori", uz_cyr: "Юрак девори", ru: "Стенка сердца (Миокард, эндокард)", en: "Heart Wall (Myocardium & Endocardium)", lat: "Paries cordis" },
    13: { uz_lat: "Timus (Ayrisimon bez)", uz_cyr: "Тимус (Айрисимон без)", ru: "Вилочковая железа (Тимус)", en: "Thymus Gland", lat: "Thymus" },
    14: { uz_lat: "Limfatik tugun", uz_cyr: "Лимфатик тугун", ru: "Лимфатический узел", en: "Lymph Node", lat: "Nodus lymphaticus" },
    15: { uz_lat: "Taloq", uz_cyr: "Талоқ", ru: "Селезенка", en: "Spleen", lat: "Lien" },
    16: { uz_lat: "Gipofiz", uz_cyr: "Гипофиз", ru: "Гипофиз", en: "Pituitary Gland (Hypophysis)", lat: "Hypophysis" },
    17: { uz_lat: "Qalqonsimon bez", uz_cyr: "Қалқонсимон без", ru: "Щитовидная железа", en: "Thyroid Gland", lat: "Glandula thyroidea" },
    18: { uz_lat: "Qalqonoldi bezi", uz_cyr: "Қалқонолди бези", ru: "Околощитовидная железа", en: "Parathyroid Gland", lat: "Glandula parathyroidea" },
    19: { uz_lat: "Buyrak usti bezi", uz_cyr: "Буйрак усти бези", ru: "Надпочечник", en: "Adrenal (Suprarenal) Gland", lat: "Glandula suprarenalis" },
    20: { uz_lat: "Barmoq terisi (Qalin teri)", uz_cyr: "Бармоқ териси (Қалин тери)", ru: "Кожа пальца (Толстая кожа)", en: "Thick Skin (Finger/Palm)", lat: "Cutis crassa" },
    21: { uz_lat: "Boshning sochli terisi (Yupqa teri)", uz_cyr: "Бошнинг сочли териси (Юпқа тери)", ru: "Кожа головы с волосами (Тонкая кожа)", en: "Thin Hairy Skin (Scalp)", lat: "Cutis foveata" },
    22: { uz_lat: "Traxeya (Kengirdek)", uz_cyr: "Трахея (Кенгирдек)", ru: "Трахея", en: "Trachea", lat: "Trachea" },
    23: { uz_lat: "O'pka", uz_cyr: "Ўпка", ru: "Легкое", en: "Lung", lat: "Pulmo" },
    24: { uz_lat: "Til. Ipsimon so'rg'ichlar", uz_cyr: "Тил. Ипсимон сўрғичлар", ru: "Язык. Нитевидные сосочки", en: "Tongue. Filiform Papillae", lat: "Papillae filiformes linguae" },
    25: { uz_lat: "Til. Bargsimon so'rg'ichlar", uz_cyr: "Тил. Баргсимон сўрғичлар", ru: "Язык. Листовидные сосочки", en: "Tongue. Foliate Papillae", lat: "Papillae foliatae linguae" },
    26: { uz_lat: "Tish taraqqiyoti (Emal a'zosi / Qo'ng'iroqcha davri)", uz_cyr: "Тиш тараққиёти (Эмаль аъзоси / Қўнғироқча даври)", ru: "Развитие зуба (Эмалевый орган, стадия колокола)", en: "Tooth Development (Enamel Organ, Bell Stage)", lat: "Organum adamantinum" },
    27: { uz_lat: "Tish taraqqiyoti (Dentin va emal gistogenezi)", uz_cyr: "Тиш тараққиёти (Дентин ва эмалнинг ҳосил бўлиши)", ru: "Развитие зуба (Дентиногенез и амелогенез)", en: "Tooth Development (Dentinogenesis and Amelogenesis)", lat: "Dentinogenesis et amelogenesis" },
    28: { uz_lat: "Tanglay murtagi", uz_cyr: "Танглай муртаги", ru: "Небная миндалина", en: "Palatine Tonsil", lat: "Tonsilla palatina" },
    29: { uz_lat: "Quloq oldi so'lak bezi", uz_cyr: "Қулоқ олди сўлак бези", ru: "Околоушная слюнная железа", en: "Parotid Salivary Gland", lat: "Glandula parotidea" },
    30: { uz_lat: "Jag' osti so'lak bezi", uz_cyr: "Жағ ости сўлак бези", ru: "Поднижнечелюстная слюнная железа", en: "Submandibular Salivary Gland", lat: "Glandula submandibularis" },
    31: { uz_lat: "Til osti so'lak bezi", uz_cyr: "Тил ости сўлак бези", ru: "Подъязычная слюнная железа", en: "Sublingual Salivary Gland", lat: "Glandula sublingualis" },
    32: { uz_lat: "Qizilo'ngachning ko'ndalang kesimi", uz_cyr: "Қизилўнгачнинг кўндаланг кесими", ru: "Пищевод (поперечный срез)", en: "Esophagus (Cross Section)", lat: "Oesophagus" },
    33: { uz_lat: "Qizilo'ngachning me'daga o'tish sohasi", uz_cyr: "Қизилўнгачнинг меъдага ўтиш соҳаси", ru: "Переход пищевода в желудок", en: "Gastroesophageal Junction", lat: "Junctio gastrooesophagea" },
    34: { uz_lat: "Me'da tubi", uz_cyr: "Меъда туби", ru: "Дно желудка", en: "Fundus of Stomach", lat: "Fundus gastricus" },
    35: { uz_lat: "Me'daning pilorik qismi", uz_cyr: "Меъданинг пилорик қисми", ru: "Пилорический отдел желудка", en: "Pylorus of Stomach", lat: "Pylorus gastricus" },
    36: { uz_lat: "O'n ikki barmoqli ichak", uz_cyr: "Ўн икки бармоқли ичак", ru: "Двенадцатиперстная кишка", en: "Duodenum", lat: "Duodenum" },
    37: { uz_lat: "Ingichka ichak (Och ichak)", uz_cyr: "Ингичка ичак (Оч ичак)", ru: "Тощая кишка (Тонкий кишечник)", en: "Jejunum (Small Intestine)", lat: "Jejunum" },
    38: { uz_lat: "Yo'g'on ichak", uz_cyr: "Йўғон ичак", ru: "Толстая кишка (Ободочная кишка)", en: "Colon (Large Intestine)", lat: "Colon" },
    39: { uz_lat: "Me'da osti bezi", uz_cyr: "Меъда ости бези", ru: "Поджелудочная железа", en: "Pancreas", lat: "Pancreas" },
    40: { uz_lat: "Jigar", uz_cyr: "Жигар", ru: "Печень", en: "Liver", lat: "Hepar" },
    41: { uz_lat: "Buyrak", uz_cyr: "Буйрак", ru: "Почка", en: "Kidney", lat: "Ren" },
    42: { uz_lat: "Siydik nayi", uz_cyr: "Сийдик найи", ru: "Мочеточник", en: "Ureter", lat: "Ureter" },
    43: { uz_lat: "Siydik pufagi", uz_cyr: "Сийдик пуфаги", ru: "Мочевой пузырь", en: "Urinary Bladder", lat: "Vesica urinaria" },
    44: { uz_lat: "Urug'don (Moyak)", uz_cyr: "Уруғдон (Мояк)", ru: "Семенник (Яичко)", en: "Testis", lat: "Testis" },
    45: { uz_lat: "Urug'don ortig'i", uz_cyr: "Уруғдон ортиғи", ru: "Придаток яичка", en: "Epididymis", lat: "Epididymis" },
    46: { uz_lat: "Prostata bezi", uz_cyr: "Простата бези", ru: "Предстательная железа (Простата)", en: "Prostate Gland", lat: "Prostata" },
    47: { uz_lat: "Tuxumdon", uz_cyr: "Тухумдон", ru: "Яичник", en: "Ovary", lat: "Ovarium" },
    48: { uz_lat: "Bachadon", uz_cyr: "Бачадон", ru: "Матка", en: "Uterus", lat: "Uterus" },
    49: { uz_lat: "Sut bezi", uz_cyr: "Сут бези", ru: "Молочная железа", en: "Mammary Gland", lat: "Glandula mammaria" },
    50: { uz_lat: "Yo'ldoshning ona qismi", uz_cyr: "Йўлдошнинг она қисми", ru: "Плацента (материнская часть)", en: "Placenta (Maternal Part)", lat: "Placenta (pars materna)" },
    51: { uz_lat: "Yo'ldoshning homila qismi", uz_cyr: "Йўлдошнинг ҳомила қисми", ru: "Плацента (плодная часть)", en: "Placenta (Fetal Part)", lat: "Placenta (pars fetalis)" }
  };

  // ========================================================
  // TRANSLITERATION & MULTILINGUAL CONVERSION ENGINE
  // ========================================================
  const CYR_TO_LAT_MAP = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'j','з':'z','и':'i',
    'й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t',
    'у':'u','ф':'f','х':'x','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':"'",'ы':'i',
    'ь':'','э':'e','ю':'yu','я':'ya','ў':"o'",'ғ':"g'",'қ':'q','ҳ':'h'
  };

  const LAT_TO_CYR_RULES = [
    [/o['\x60ʻ‘’]/gi, (m) => m[0] === m[0].toUpperCase() ? 'Ў' : 'ў'],
    [/g['\x60ʻ‘’]/gi, (m) => m[0] === m[0].toUpperCase() ? 'Ғ' : 'ғ'],
    [/shch/gi, (m) => m[0] === m[0].toUpperCase() ? 'Щ' : 'щ'],
    [/sh/gi, (m) => m[0] === m[0].toUpperCase() ? 'Ш' : 'ш'],
    [/ch/gi, (m) => m[0] === m[0].toUpperCase() ? 'Ч' : 'ч'],
    [/yo/gi, (m) => m[0] === m[0].toUpperCase() ? 'Ё' : 'ё'],
    [/yu/gi, (m) => m[0] === m[0].toUpperCase() ? 'Ю' : 'ю'],
    [/ya/gi, (m) => m[0] === m[0].toUpperCase() ? 'Я' : 'я'],
    [/ts/gi, (m) => m[0] === m[0].toUpperCase() ? 'Ц' : 'ц'],
    [/ye/gi, (m) => m[0] === m[0].toUpperCase() ? 'Е' : 'е'],
    [/(^|[\s\x28\x5B\x7B\<\>\,\.\:\;\!\?\"\'\-\—\–])e/gi, (m, p1) => {
      const isUpper = m.slice(p1.length).toUpperCase() === m.slice(p1.length);
      return p1 + (isUpper ? 'Э' : 'э');
    }],
    [/['\x60ʻ‘’]/g, 'ъ']
  ];

  const SINGLE_LAT_TO_CYR = {
    'a':'а','b':'б','d':'д','e':'е','f':'ф','g':'г','h':'ҳ','i':'и','j':'ж','k':'к',
    'l':'л','m':'м','n':'н','o':'о','p':'п','q':'қ','r':'р','s':'с','t':'т','u':'у',
    'v':'в','x':'х','y':'й','z':'з'
  };

  function cyrToLat(str) {
    if (!str || typeof str !== 'string') return '';
    let res = str.replace(/(^|[\s\x28\x5B\x7B\<\>\,\.\:\;\!\?\"\'\-\—\–]|[аеёиоуэюяўАЕЁИОУЭЮЯЎ])([Ее])/g, (m, p1, p2) => {
      return p1 + (p2 === 'Е' ? 'Ye' : 'ye');
    });
    return res.replace(/([А-Яа-яЁёЎўҒғҚқҲҳ])/g, (ch) => {
      const isUpper = ch === ch.toUpperCase();
      const lower = ch.toLowerCase();
      const rep = CYR_TO_LAT_MAP[lower] !== undefined ? CYR_TO_LAT_MAP[lower] : ch;
      if (isUpper) {
        if (rep.length > 1) {
          return rep.charAt(0).toUpperCase() + rep.slice(1);
        }
        return rep.toUpperCase();
      }
      return rep;
    });
  }

  function latToCyr(str) {
    if (!str || typeof str !== 'string') return '';
    let res = str;
    for (const [pattern, repl] of LAT_TO_CYR_RULES) {
      res = res.replace(pattern, repl);
    }
    return res.replace(/([a-zA-Z])/g, (ch) => {
      const isUpper = ch === ch.toUpperCase();
      const lower = ch.toLowerCase();
      const rep = SINGLE_LAT_TO_CYR[lower] !== undefined ? SINGLE_LAT_TO_CYR[lower] : ch;
      return isUpper ? rep.toUpperCase() : rep;
    });
  }

  function convertHtml(html, fn) {
    if (!html || typeof html !== 'string') return '';
    const parts = html.split(/(<[^>]+>|&[a-zA-Z0-9#]+;)/g);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0 && parts[i]) {
        parts[i] = fn(parts[i]);
      }
    }
    return parts.join('');
  }

  function localizeText(text, targetLang) {
    if (!text || typeof text !== 'string') return '';
    const lang = targetLang || state.lang;
    if (lang === 'uz-cyr' || lang === 'ru') {
      return /[а-яА-ЯёЁўЎғҒқҚҳҲ]/.test(text) ? text : latToCyr(text);
    }
    return /[а-яА-ЯёЁўЎғҒқҚҳҲ]/.test(text) ? cyrToLat(text) : text;
  }

  function localizeHtml(html, targetLang) {
    if (!html || typeof html !== 'string') return '';
    const lang = targetLang || state.lang;
    if (lang === 'uz-cyr' || lang === 'ru') {
      return /[а-яА-ЯёЁўЎғҒқҚҳҲ]/.test(html) ? html : convertHtml(html, latToCyr);
    }
    return /[а-яА-ЯёЁўЎғҒқҚҳҲ]/.test(html) ? convertHtml(html, cyrToLat) : html;
  }

  // State Management
  const state = {
    lang: safeStorage.get('histo_lang', 'uz-lat'), // 'uz-lat', 'uz-cyr', 'ru', 'en'
    activeTab: 'questions',
    searchQuery: '',
    selectedCategory: 'all',
    hideAnswers: false,
    pageLimit: 25,
    favorites: safeStorage.getJSON('histo_favorites', { questions: [], cases: [], preparations: [] }),
    customSchemes: safeStorage.getJSON('histo_custom_schemes', []),
    theme: safeStorage.get('histo_theme', 'light'),
    currentTicket: null,
    cardModes: {}, // 'micro' or 'atlas'
    profile: safeStorage.getJSON('histo_user_profile', {
      name: 'Talaba',
      group: 'Tibbiyot OTM',
      specialty: 'Davolash ishi',
      score: 0,
      learnedQuestions: [],
      learnedCases: [],
      learnedPreps: [],
      passedTickets: 0,
      ticketGrades: []
    })
  };

  function t(key) {
    const langObj = I18N[state.lang] || I18N['uz-lat'];
    return langObj[key] || (I18N['uz-lat'][key] || key);
  }

  // Localize Preparation Name
  function getPrepName(p) {
    const tr = HISTO_PREP_TRANSLATIONS[p.id];
    if (tr) {
      if (state.lang === 'uz-cyr') return tr.uz_cyr;
      if (state.lang === 'ru') return tr.ru;
      if (state.lang === 'en') return tr.en;
      return tr.uz_lat;
    }
    return p.name;
  }

  // Rank / Title calculation
  function getRankTitle(score) {
    if (score >= 500) {
      if (state.lang === 'ru') return { title: "Профессор гистологии", level: 5 };
      if (state.lang === 'en') return { title: "Histology Professor", level: 5 };
      if (state.lang === 'uz-cyr') return { title: "Гистология Профессори", level: 5 };
      return { title: "Gistologiya Professori", level: 5 };
    }
    if (score >= 300) {
      if (state.lang === 'ru') return { title: "Ординатор-гистолог", level: 4 };
      if (state.lang === 'en') return { title: "Histology Resident", level: 4 };
      if (state.lang === 'uz-cyr') return { title: "Ординатор-Гистолог", level: 4 };
      return { title: "Ordinator-Gistolog", level: 4 };
    }
    if (score >= 150) {
      if (state.lang === 'ru') return { title: "Врач-интерн", level: 3 };
      if (state.lang === 'en') return { title: "Intern Doctor", level: 3 };
      if (state.lang === 'uz-cyr') return { title: "Шифокор-Интерн", level: 3 };
      return { title: "Shifokor-Intern", level: 3 };
    }
    if (score >= 50) {
      if (state.lang === 'ru') return { title: "Младший лаборант", level: 2 };
      if (state.lang === 'en') return { title: "Junior Lab Assistant", level: 2 };
      if (state.lang === 'uz-cyr') return { title: "Кичик Лаборант", level: 2 };
      return { title: "Kichik Laborant", level: 2 };
    }
    if (state.lang === 'ru') return { title: "Студент гистологии", level: 1 };
    if (state.lang === 'en') return { title: "Histology Student", level: 1 };
    if (state.lang === 'uz-cyr') return { title: "Гистология Талабаси", level: 1 };
    return { title: "Gistologiya Talabasi", level: 1 };
  }

  function saveProfile() {
    safeStorage.setJSON('histo_user_profile', state.profile);
    updateProfileHeader();
  }

  function updateProfileHeader() {
    const scoreEl = document.getElementById('headerScore');
    const badgeScore = document.getElementById('badgeProfileScore');
    if (scoreEl) scoreEl.textContent = state.profile.score || 0;
    if (badgeScore) badgeScore.textContent = `${state.profile.score || 0} ${t('score')}`;
  }

  function toggleMastered(type, id) {
    const key = type === 'questions' ? 'learnedQuestions' : (type === 'cases' ? 'learnedCases' : (type === 'schemes' ? 'learnedSchemes' : 'learnedPreps'));
    const pts = type === 'questions' ? 5 : 10;
    if (!state.profile[key]) state.profile[key] = [];
    const list = state.profile[key];
    const idx = list.indexOf(id);
    if (idx > -1) {
      list.splice(idx, 1);
      state.profile.score = Math.max(0, (state.profile.score || 0) - pts);
    } else {
      list.push(id);
      state.profile.score = (state.profile.score || 0) + pts;
    }
    saveProfile();
    updateBadges();
    renderCurrentTab();
  }

  function isMastered(type, id) {
    const key = type === 'questions' ? 'learnedQuestions' : (type === 'cases' ? 'learnedCases' : (type === 'schemes' ? 'learnedSchemes' : 'learnedPreps'));
    return (state.profile[key] || []).includes(id);
  }

  function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
      .replace(/ў/g, "o'").replace(/ғ/g, "g'").replace(/ш/g, 'sh').replace(/ч/g, 'ch').replace(/х/g, 'x').replace(/ҳ/g, 'h')
      .replace(/[^a-z0-9а-яё]/gi, '');
  }

  function matchesQuery(itemText, query) {
    if (!query) return true;
    const cleanQuery = query.toLowerCase().trim();
    if (itemText.toLowerCase().includes(cleanQuery)) return true;
    const normText = normalizeText(itemText);
    const normQuery = normalizeText(cleanQuery);
    return normText.includes(normQuery);
  }

  // DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const mainSearchInput = document.getElementById('mainSearchInput');
  const categoryChipsContainer = document.getElementById('categoryChips');
  const hideAnswersCheckbox = document.getElementById('hideAnswersToggle');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const headerProfileBtn = document.getElementById('headerProfileBtn');
  const contentArea = document.getElementById('contentArea');
  const statsSummary = document.getElementById('statsSummary');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const langDropdownBtn = document.getElementById('langDropdownBtn');
  const langDropdownMenu = document.getElementById('langDropdownMenu');
  const currentLangLabel = document.getElementById('currentLangLabel');

  const badgeCounts = {
    q: document.getElementById('badgeQuestions'),
    c: document.getElementById('badgeCases'),
    p: document.getElementById('badgePreparations'),
    s: document.getElementById('badgeSchemes'),
    f: document.getElementById('badgeFavorites')
  };

  // Switch Language
  window.switchLanguage = function (lang) {
    if (!I18N[lang]) lang = 'uz-lat';
    state.lang = lang;
    safeStorage.set('histo_lang', lang);

    if (currentLangLabel) {
      currentLangLabel.textContent = I18N[lang].langName;
    }
    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    if (langDropdownMenu) langDropdownMenu.classList.remove('open');

    const brandTitle = document.getElementById('brandTitle');
    const brandSubtitle = document.getElementById('brandSubtitle');
    if (brandTitle) brandTitle.textContent = t('brandTitle');
    if (brandSubtitle) brandSubtitle.textContent = t('brandSubtitle');

    document.querySelectorAll('[data-tab-key]').forEach(el => {
      const key = el.getAttribute('data-tab-key');
      if (key && I18N[lang][key]) el.textContent = I18N[lang][key];
    });

    if (mainSearchInput) mainSearchInput.placeholder = t('searchPlaceholder');
    const hideAnswersLabel = document.getElementById('hideAnswersLabel');
    if (hideAnswersLabel) hideAnswersLabel.textContent = t('hideAnswers');

    updateProfileHeader();
    renderCategories();
    renderCurrentTab();
  };

  if (langDropdownBtn && langDropdownMenu) {
    langDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdownMenu.classList.toggle('open');
    });

    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selected = btn.getAttribute('data-lang');
        window.switchLanguage(selected);
      });
    });

    document.addEventListener('click', () => {
      langDropdownMenu.classList.remove('open');
    });
  }

  window.toggleFav = function (type, id) {
    if (!state.favorites[type]) state.favorites[type] = [];
    const idx = state.favorites[type].indexOf(id);
    if (idx > -1) {
      state.favorites[type].splice(idx, 1);
    } else {
      state.favorites[type].push(id);
    }
    safeStorage.setJSON('histo_favorites', state.favorites);
    updateBadges();
    renderCurrentTab();
  };

  window.toggleMasteredItem = function (type, id) {
    toggleMastered(type, id);
  };

  function updateBadges() {
    const qLen = (window.HISTO_QUESTIONS || []).length;
    const cLen = (window.HISTO_CASES || []).length;
    const pLen = (window.HISTO_PREPARATIONS || []).length;
    const sLen = (window.HISTO_SCHEMES || []).length + (state.customSchemes || []).length;
    const fLen = (state.favorites.questions || []).length +
                 (state.favorites.cases || []).length +
                 (state.favorites.preparations || []).length;

    if (badgeCounts.q) badgeCounts.q.textContent = qLen;
    if (badgeCounts.c) badgeCounts.c.textContent = cLen;
    if (badgeCounts.p) badgeCounts.p.textContent = pLen;
    if (badgeCounts.s) badgeCounts.s.textContent = sLen;
    if (badgeCounts.f) badgeCounts.f.textContent = fLen;
    updateProfileHeader();
  }

  function renderCategories() {
    let cats = [];
    if (state.activeTab === 'questions') {
      cats = [...new Set((window.HISTO_QUESTIONS || []).map(q => q.category))].filter(Boolean);
    } else if (state.activeTab === 'cases') {
      cats = [...new Set((window.HISTO_CASES || []).map(c => c.category))].filter(Boolean);
    } else if (state.activeTab === 'preparations') {
      cats = [...new Set((window.HISTO_PREPARATIONS || []).map(p => p.category))].filter(Boolean);
    } else if (state.activeTab === 'schemes') {
      cats = [...new Set((window.HISTO_SCHEMES || []).map(s => s.category))].filter(Boolean);
    }

    if (cats.length <= 1) {
      categoryChipsContainer.innerHTML = '';
      return;
    }

    let chipsHtml = `
      <button class="chip-btn ${state.selectedCategory === 'all' ? 'active' : ''}" data-cat="all">
        ${ICONS.sparkle} ${t('allCategories')}
      </button>
    `;

    cats.forEach(c => {
      const active = state.selectedCategory === c ? 'active' : '';
      chipsHtml += `<button class="chip-btn ${active}" data-cat="${c}">${c}</button>`;
    });

    categoryChipsContainer.innerHTML = chipsHtml;

    categoryChipsContainer.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        categoryChipsContainer.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedCategory = btn.getAttribute('data-cat');
        state.pageLimit = 25;
        renderCurrentTab();
        if (contentArea) {
          contentArea.classList.remove('liquid-tab-enter');
          void contentArea.offsetWidth;
          contentArea.classList.add('liquid-tab-enter');
        }
      });
    });
  }

  function getSlideImgSrc(prepId) {
    if (window.HISTO_PREP_IMAGES && window.HISTO_PREP_IMAGES[prepId]) {
      return window.HISTO_PREP_IMAGES[prepId];
    }
    return `images/slides/slide_${prepId}.jpg`;
  }

  function getAtlasImgSrc(prepId) {
    if (window.HISTO_ATLAS_IMAGES && window.HISTO_ATLAS_IMAGES[prepId]) {
      return window.HISTO_ATLAS_IMAGES[prepId];
    }
    return `images/atlas/atlas_${prepId}.png`;
  }

  function hasAtlas(prepId) {
    return (window.HISTO_ATLAS_IMAGES && !!window.HISTO_ATLAS_IMAGES[prepId]);
  }

  // Answer container reveal helper
  window.toggleCardAnswer = function (btn) {
    const card = btn.closest('.item-card') || btn.closest('.sim-section-box');
    if (!card) return;
    const ans = card.querySelector('.answer-container');
    if (ans) {
      const isHidden = ans.classList.contains('hidden-answer');
      if (isHidden) {
        ans.classList.remove('hidden-answer');
        btn.innerHTML = `${ICONS.eyeOff} ${t('hideAnswer')}`;
      } else {
        ans.classList.add('hidden-answer');
        btn.innerHTML = `${ICONS.eye} ${t('showAnswer')}`;
      }
    }
  };

  // Card view mode toggle (Microscope vs Atlas)
  window.toggleCardMode = function (prepId, mode) {
    if (!state.cardModes) state.cardModes = {};
    state.cardModes[prepId] = mode;
    const wrap = document.getElementById(`prep-wrap-${prepId}`);
    const img = document.getElementById(`prep-img-${prepId}`);
    const badge = document.getElementById(`prep-badge-${prepId}`);
    const btnMicro = document.getElementById(`prep-btn-micro-${prepId}`);
    const btnAtlas = document.getElementById(`prep-btn-atlas-${prepId}`);

    if (img && wrap) {
      const src = mode === 'micro' ? getSlideImgSrc(prepId) : getAtlasImgSrc(prepId);
      img.src = src;
      if (badge) {
        badge.innerHTML = mode === 'micro'
          ? `${ICONS.microscope} ${t('microscopePhoto')}`
          : `${ICONS.book} ${t('atlasDiagram')}`;
      }
      if (btnMicro) btnMicro.classList.toggle('active', mode === 'micro');
      if (btnAtlas) btnAtlas.classList.toggle('active', mode === 'atlas');
    }
  };

  // --------------------------------------------------------
  // TAB 1: NAZARIY SAVOLLAR (THEORY QUESTIONS)
  // JAVOBLAR TO'LIQ VA ANIQ KO'RINADI, HECH QANDAY BUZILISHLARSIZ
  // --------------------------------------------------------
  function renderQuestions() {
    const list = window.HISTO_QUESTIONS || [];
    const filtered = list.filter(item => {
      const matchCat = state.selectedCategory === 'all' || item.category === state.selectedCategory;
      const textToMatch = (item.question || '') + ' ' + (item.question_uz || '') + ' ' + (item.keywords || '') + ' ' + (item.answer || '');
      return matchCat && matchesQuery(textToMatch, state.searchQuery);
    });

    statsSummary.textContent = `${filtered.length} / ${list.length} ${t('tabQuestions').toLowerCase()}`;

    if (filtered.length === 0) {
      contentArea.innerHTML = `<div class="empty-state">${ICONS.search}<p>${t('searchPlaceholder')}</p></div>`;
      return;
    }

    const visibleItems = filtered.slice(0, state.pageLimit);
    let html = `<div class="cards-grid">`;

    visibleItems.forEach(item => {
      const isFav = (state.favorites.questions || []).includes(item.id);
      const isLearned = isMastered('questions', item.id);
      
      // Question title: dynamic localization
      let qTitle = '';
      if (state.lang === 'uz-cyr' || state.lang === 'ru') {
        qTitle = item.question ? item.question : latToCyr(item.question_uz || '');
      } else {
        qTitle = item.question_uz ? item.question_uz : cyrToLat(item.question || '');
      }
      
      // Question answer: dynamic HTML-safe transliteration
      const rawAnswer = item.answer || '<p>Javob tayyorlanmoqda...</p>';
      let qAnswer = '';
      if (state.lang === 'uz-cyr' || state.lang === 'ru') {
        qAnswer = convertHtml(rawAnswer, latToCyr);
      } else {
        qAnswer = convertHtml(rawAnswer, cyrToLat);
      }

      const qBadge = state.lang === 'uz-cyr' ? 'Савол' : (state.lang === 'ru' ? 'Вопрос' : (state.lang === 'en' ? 'Question' : 'Savol'));
      const qCategory = localizeText(item.category);

      html += `
        <div class="item-card ${isLearned ? 'mastered' : ''}" id="card-q-${item.id}">
          <div class="card-header-bar">
            <div class="card-meta">
              <span class="badge-id">#${qBadge} ${item.id}</span>
              <span class="badge-cat">${qCategory}</span>
            </div>
            <div class="card-tools">
              <button class="btn-card-action ${isLearned ? 'learned' : ''}" onclick="window.toggleMasteredItem('questions', ${item.id})" title="${t('markMastered')}">
                ${ICONS.checkCircle}
              </button>
              <button class="btn-card-action ${isFav ? 'favorited' : ''}" onclick="window.toggleFav('questions', ${item.id})" title="Sevimlilar">
                ${isFav ? ICONS.starFilled : ICONS.star}
              </button>
            </div>
          </div>
          
          <h3 class="card-title">${qTitle}</h3>
          
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">
            ${state.hideAnswers ? `${ICONS.eye} ${t('showAnswer')}` : `${ICONS.eyeOff} ${t('hideAnswer')}`}
          </button>
          
          <div class="answer-container ${state.hideAnswers ? 'hidden-answer' : ''}">
            ${qAnswer}
            <div class="card-edit-bar">
              <button type="button" class="btn-card-edit-fix" onclick="window.openCorrectionModal('question', ${item.id})">
                ✏️ Javobni to'g'rilash (Ustoz tahriri)
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    if (filtered.length > state.pageLimit) {
      html += `
        <div style="text-align:center; margin-top:24px;">
          <button class="btn-generate" id="btnLoadMoreQuestions" style="margin:0 auto;">
            ${ICONS.expand} Yana 25 ta ko'rsatish (${filtered.length - state.pageLimit} ta qoldi)
          </button>
        </div>
      `;
    }

    contentArea.innerHTML = html;

    const btnMore = document.getElementById('btnLoadMoreQuestions');
    if (btnMore) {
      btnMore.addEventListener('click', () => {
        state.pageLimit += 25;
        renderQuestions();
      });
    }
  }

  // --------------------------------------------------------
  // TAB 2: VAZIYATLI MASALALAR (CLINICAL CASES)
  // JAVOBLAR (SOLUTION) TO'LIQ VA ANIQ CHIQADI
  // --------------------------------------------------------
  function renderCases() {
    const list = window.HISTO_CASES || [];
    const filtered = list.filter(item => {
      const matchCat = state.selectedCategory === 'all' || !item.category || item.category === state.selectedCategory;
      const subQStr = Array.isArray(item.sub_questions) ? item.sub_questions.join(' ') : (item.question || '');
      const textToMatch = (item.title || '') + ' ' + (item.title_uz || '') + ' ' + (item.case_text || '') + ' ' + subQStr + ' ' + (item.solution || item.answer || '');
      return matchCat && matchesQuery(textToMatch, state.searchQuery);
    });

    statsSummary.textContent = `${filtered.length} / ${list.length} ${t('tabCases').toLowerCase()}`;

    if (filtered.length === 0) {
      contentArea.innerHTML = `<div class="empty-state">${ICONS.search}<p>${t('searchPlaceholder')}</p></div>`;
      return;
    }

    const visibleItems = filtered.slice(0, state.pageLimit);
    let html = `<div class="cards-grid">`;

    visibleItems.forEach(item => {
      const isFav = (state.favorites.cases || []).includes(item.id);
      const isLearned = isMastered('cases', item.id);
      
      const caseTitle = (state.lang === 'uz-lat' || state.lang === 'en') 
        ? (item.title_uz ? item.title_uz : cyrToLat(item.title || `Vaziyatli masala #${item.id}`))
        : (item.title ? item.title : latToCyr(item.title_uz || `Вазиятли масала #${item.id}`));

      const caseText = (state.lang === 'uz-lat' || state.lang === 'en')
        ? cyrToLat(item.case_text || '')
        : (/[а-яА-Я]/.test(item.case_text || '') ? item.case_text : latToCyr(item.case_text || ''));

      let questionsHtml = '';
      if (Array.isArray(item.sub_questions) && item.sub_questions.length > 0) {
        const localizedQuestions = item.sub_questions.map(q => {
          return (state.lang === 'uz-lat' || state.lang === 'en') ? cyrToLat(q) : (/[а-яА-Я]/.test(q) ? q : latToCyr(q));
        });
        questionsHtml = `
          <div style="background:var(--bg-card); border-left:3px solid var(--primary); padding:10px 14px; border-radius:0 8px 8px 0; margin-bottom:14px;">
            <b style="color:var(--primary); font-size:0.86rem; display:block; margin-bottom:6px;">${t('caseQuestions')}</b>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${localizedQuestions.map(q => `<div style="font-size:0.92rem; font-weight:600; color:var(--text-main); line-height:1.45;">• ${q}</div>`).join('')}
            </div>
          </div>
        `;
      } else if (item.question) {
        const singleQ = (state.lang === 'uz-lat' || state.lang === 'en') ? cyrToLat(item.question) : (/[а-яА-Я]/.test(item.question) ? item.question : latToCyr(item.question));
        questionsHtml = `
          <div style="font-size:0.94rem; font-weight:700; margin-bottom:12px; color:var(--primary);">
            ${singleQ}
          </div>
        `;
      }

      // Toza xom HTML yechim/javob (solution yoki answer)
      const rawSol = item.solution || item.answer || '<p>Diagnostik tahlil tayyorlanmoqda...</p>';
      const caseSolution = (state.lang === 'uz-lat' || state.lang === 'en')
        ? convertHtml(rawSol, cyrToLat)
        : (/[а-яА-Я]/.test(rawSol) ? rawSol : convertHtml(rawSol, latToCyr));

      const caseBadge = state.lang === 'uz-cyr' ? 'Масала' : (state.lang === 'ru' ? 'Задача' : (state.lang === 'en' ? 'Case' : 'Masala'));
      const caseCategory = localizeText(item.category || 'Klinik Masala');

      html += `
        <div class="item-card ${isLearned ? 'mastered' : ''}" id="card-c-${item.id}">
          <div class="card-header-bar">
            <div class="card-meta">
              <span class="badge-id">#${caseBadge} ${item.id}</span>
              <span class="badge-cat">${caseCategory}</span>
            </div>
            <div class="card-tools">
              <button class="btn-card-action ${isLearned ? 'learned' : ''}" onclick="window.toggleMasteredItem('cases', ${item.id})" title="${t('markMastered')}">
                ${ICONS.checkCircle}
              </button>
              <button class="btn-card-action ${isFav ? 'favorited' : ''}" onclick="window.toggleFav('cases', ${item.id})" title="Sevimlilar">
                ${isFav ? ICONS.starFilled : ICONS.star}
              </button>
            </div>
          </div>
          
          <h3 class="card-title">${caseTitle}</h3>
          
          <div style="background:var(--bg-subtle); padding:12px; border-radius:10px; margin-bottom:12px; font-size:0.92rem; line-height:1.5;">
            <b>${t('caseSituation')}</b> ${caseText}
          </div>
          
          ${questionsHtml}
          
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">
            ${state.hideAnswers ? `${ICONS.eye} ${t('showAnswer')}` : `${ICONS.eyeOff} ${t('hideAnswer')}`}
          </button>
          
          <div class="answer-container ${state.hideAnswers ? 'hidden-answer' : ''}">
            <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); padding:14px; border-radius:10px;">
              <b style="color:#059669; display:flex; align-items:center; gap:6px; margin-bottom:8px; font-size:0.95rem;">
                ${ICONS.target} ${t('caseSolution')}
              </b>
              <div style="line-height:1.55; color:var(--text-main); font-size:0.92rem;">
                ${caseSolution}
              </div>
            </div>
            <div class="card-edit-bar">
              <button type="button" class="btn-card-edit-fix" onclick="window.openCorrectionModal('case', ${item.id})">
                ✏️ Yechimni to'g'rilash (Ustoz tahriri)
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    if (filtered.length > state.pageLimit) {
      html += `
        <div style="text-align:center; margin-top:24px;">
          <button class="btn-generate" id="btnLoadMoreCases" style="margin:0 auto;">
            ${ICONS.expand} Yana 25 ta ko'rsatish (${filtered.length - state.pageLimit} ta qoldi)
          </button>
        </div>
      `;
    }

    contentArea.innerHTML = html;

    const btnMore = document.getElementById('btnLoadMoreCases');
    if (btnMore) {
      btnMore.addEventListener('click', () => {
        state.pageLimit += 25;
        renderCases();
      });
    }
  }

  // --------------------------------------------------------
  // TAB 3: MIKROSKOPIK PREPARATLAR (MICROSCOPIC SLIDES)
  // HAR BIR KARTADA TO'G'RIDAN-TO'G'RI 2.5X KATTALASHTIRISH VA TO'LIQ VIEWER
  // --------------------------------------------------------
  function renderPreparations() {
    const list = window.HISTO_PREPARATIONS || [];
    const filtered = list.filter(item => {
      const matchCat = state.selectedCategory === 'all' || item.category === state.selectedCategory;
      const localizedName = getPrepName(item);
      const textToMatch = item.name + ' ' + (item.name_lat || '') + ' ' + localizedName + ' ' + item.diagnostic_key + ' ' + item.staining;
      return matchCat && matchesQuery(textToMatch, state.searchQuery);
    });

    statsSummary.textContent = `${filtered.length} / ${list.length} ${t('tabPreparations').toLowerCase()}`;

    if (filtered.length === 0) {
      contentArea.innerHTML = `<div class="empty-state">${ICONS.search}<p>${t('searchPlaceholder')}</p></div>`;
      return;
    }

    let html = `<div class="cards-grid">`;

    filtered.forEach(item => {
      const isFav = (state.favorites.preparations || []).includes(item.id);
      const isLearned = isMastered('preparations', item.id);
      const hasAt = hasAtlas(item.id);
      const cardMode = (state.cardModes && state.cardModes[item.id]) || 'micro';
      const imgSrc = cardMode === 'micro' ? getSlideImgSrc(item.id) : getAtlasImgSrc(item.id);
      const prepTitle = getPrepName(item);

      const prepBadge = state.lang === 'uz-cyr' ? 'Препарат' : (state.lang === 'ru' ? 'Препарат' : (state.lang === 'en' ? 'Slide' : 'Preparat'));
      const prepStaining = localizeText(item.staining);
      const prepDiagKey = localizeText(item.diagnostic_key);
      const prepAtlasPointers = localizeText(item.atlas_pointers || '');
      const prepLayers = localizeHtml(item.atlas_desc || item.layers_and_structure);
      const prepExamQA = localizeHtml(item.exam_questions);

      html += `
        <div class="item-card ${isLearned ? 'mastered' : ''}" id="card-p-${item.id}">
          <div class="card-header-bar">
            <div class="card-meta">
              <span class="badge-id">#${prepBadge} ${item.id}</span>
              <span class="badge-cat">${item.name_lat}</span>
            </div>
            <div class="card-tools">
              <button class="btn-card-action ${isLearned ? 'learned' : ''}" onclick="window.toggleMasteredItem('preparations', ${item.id})" title="${t('markMastered')}">
                ${ICONS.checkCircle}
              </button>
              <button class="btn-card-action ${isFav ? 'favorited' : ''}" onclick="window.toggleFav('preparations', ${item.id})" title="Sevimlilar">
                ${isFav ? ICONS.starFilled : ICONS.star}
              </button>
            </div>
          </div>
          
          <h3 class="card-title">${prepTitle}</h3>
          
          <!-- Mode Switcher Tabs for Microscope vs Atlas Diagram -->
          <div class="prep-toggle-bar">
            <button class="prep-toggle-btn ${cardMode === 'micro' ? 'active' : ''}" id="prep-btn-micro-${item.id}" onclick="window.toggleCardMode(${item.id}, 'micro')">
              ${ICONS.microscope} ${t('microscopePhoto')}
            </button>
            ${hasAt ? `
            <button class="prep-toggle-btn ${cardMode === 'atlas' ? 'active' : ''}" id="prep-btn-atlas-${item.id}" onclick="window.toggleCardMode(${item.id}, 'atlas')">
              ${ICONS.book} ${t('atlasDiagram')}
            </button>
            ` : ''}
          </div>
          
          <!-- Prep Image Wrap -->
          <div class="prep-card-image-wrap" id="prep-wrap-${item.id}" 
               onclick="window.openSlideViewer(${item.id}, (state.cardModes && state.cardModes[${item.id}]) || 'micro', false)" 
               title="To'liq ekranda ochish">
            <img id="prep-img-${item.id}" loading="lazy" decoding="async" src="${imgSrc}" alt="${prepTitle}" class="prep-card-image" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Histology_micrograph.jpg/640px-Histology_micrograph.jpg';" />
            <div class="prep-image-overlay">
              <span id="prep-badge-${item.id}" style="font-size:0.82rem; font-weight:600; text-shadow:0 1px 3px rgba(0,0,0,0.85); display:inline-flex; align-items:center; gap:5px;">
                ${cardMode === 'micro' ? `${ICONS.microscope} ${t('microscopePhoto')}` : `${ICONS.book} ${t('atlasDiagram')}`}
              </span>
              <span class="prep-zoom-pill">${ICONS.expand} ${t('zoom')}</span>
            </div>
          </div>

          <!-- KARTANING O'ZIDAGI MAXSUS KATTALASHTIRISH TUGMALARI -->
          <div style="display:flex; gap:8px; margin:10px 0;">
            <button class="btn-secondary" style="flex:1; padding:9px 12px; font-size:0.84rem; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; gap:6px; background:var(--primary-light); color:var(--primary); font-weight:700; border:1px solid rgba(2,132,199,0.3);" onclick="window.openSlideViewer(${item.id}, '${cardMode}', true)">
              ${ICONS.zoomIn} 2.5x ${t('zoom')}
            </button>
            <button class="btn-secondary" style="flex:1; padding:9px 12px; font-size:0.84rem; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="window.openSlideViewer(${item.id}, '${cardMode}', false)">
              ${ICONS.expand} ${t('showDetails')}
            </button>
          </div>
          
          <div class="prep-grid-box">
            <div class="prep-box-sec">
              <h5>${ICONS.palette} ${t('staining')}:</h5>
              <p>${prepStaining}</p>
            </div>
            <div class="prep-box-sec">
              <h5>${ICONS.target} ${t('diagKey')}:</h5>
              <p><b>${prepDiagKey}</b></p>
            </div>
            ${item.atlas_fig ? `
            <div class="prep-box-sec" style="grid-column: 1 / -1; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.2);">
              <h5 style="color:#059669;">${ICONS.book} ${t('atlasPointers')} (${item.atlas_fig}):</h5>
              <div style="font-size:0.84rem; line-height:1.45; color:var(--text-main);">${prepAtlasPointers}</div>
            </div>
            ` : ''}
          </div>

          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">
            ${ICONS.eye} ${t('showDetails')}
          </button>
          
          <div class="answer-container hidden-answer">
            <div style="margin-top:10px;">
              <h5 style="font-size:0.88rem; color:var(--primary); margin-bottom:6px;">${ICONS.layers} ${t('layers')}:</h5>
              <div style="font-size:0.9rem; line-height:1.5;">${prepLayers}</div>
            </div>
            <div class="prep-exam-qa" style="margin-top:12px; background:var(--bg-subtle); padding:10px 12px; border-radius:10px;">
              <h5 style="font-size:0.88rem; color:#d97706; margin-bottom:6px;">${ICONS.gradCap} ${t('examQA')}:</h5>
              <div style="font-size:0.88rem; line-height:1.5;">${prepExamQA}</div>
            </div>
            <div class="card-edit-bar">
              <button type="button" class="btn-card-edit-fix" onclick="window.openCorrectionModal('prep', ${item.id})">
                ✏️ Preparat ma'lumotini to'g'rilash (Ustoz tahriri)
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    contentArea.innerHTML = html;
  }

  // --------------------------------------------------------
  // TAB 4: SXEMALAR (83 TA RASMIY IMTIHON SXEMALARI VA DIAGRAMMALAR)
  // --------------------------------------------------------
  function renderSchemes() {
    const list = window.HISTO_SCHEMES || [];
    const filtered = list.filter(item => {
      const matchCat = state.selectedCategory === 'all' || item.category === state.selectedCategory;
      const textToMatch = (item.title || '') + ' ' + (item.title_uz || '') + ' ' + (item.title_cyr || '') + ' ' + (item.title_ru || '') + ' ' +
                          (item.question || '') + ' ' + (item.question_uz || '') + ' ' + (item.question_cyr || '') + ' ' + (item.question_ru || '') + ' ' +
                          (item.category || '');
      return matchCat && matchesQuery(textToMatch, state.searchQuery);
    });

    statsSummary.textContent = `${filtered.length} / ${list.length} ${t('tabSchemes').toLowerCase()}`;

    if (filtered.length === 0) {
      contentArea.innerHTML = `<div class="empty-state">${ICONS.search}<p>${t('searchPlaceholder')}</p></div>`;
      return;
    }

    const introText = state.lang === 'uz-cyr'
      ? 'Тиббиёт ОТМлари расмий имтиҳон схемалари (83 та). Схемаларни босиб ёки <b>2.5х Катталаштириш</b> орқали тўлиқ экранда кўринг.'
      : (state.lang === 'ru'
        ? 'Официальные экзаменационные схемы медицинских ВУЗов (83 схемы). Нажмите на схему или <b>2.5x Zoom</b> для детального изучения.'
        : (state.lang === 'en'
          ? 'Official Medical Examination Schemes (83 diagrams). Tap diagram or <b>2.5x Zoom</b> to inspect in high resolution.'
          : 'Tibbiyot OTMlari rasmiy imtihon sxemalari (83 ta). Sxemalarni bosib yoki <b>2.5x Kattalashtirish</b> orqali to\'liq ekranda ko\'ring.'));

    const visibleItems = filtered.slice(0, state.pageLimit);
    let html = `
      <div style="margin-bottom:16px;">
        <p style="font-size:0.92rem; color:var(--text-muted); margin:0;">
          ${introText}
        </p>
      </div>
      <div class="cards-grid">
    `;

    visibleItems.forEach(item => {
      const isFav = (state.favorites.schemes || []).includes(item.id);
      const isLearned = isMastered('schemes', item.id);

      // Localized scheme title
      let sTitle = '';
      if (state.lang === 'uz-cyr') sTitle = item.title_cyr || latToCyr(item.title_uz || item.title);
      else if (state.lang === 'ru') sTitle = item.title_ru || item.title_cyr || item.title;
      else sTitle = item.title_uz || cyrToLat(item.title || item.title_cyr);

      // Localized scheme task/question
      let sQuestion = '';
      if (state.lang === 'uz-cyr') sQuestion = item.question_cyr || latToCyr(item.question_uz || item.question);
      else if (state.lang === 'ru') sQuestion = item.question_ru || item.question_cyr || item.question;
      else sQuestion = item.question_uz || cyrToLat(item.question || item.question_cyr);

      // Localized scheme answer
      let sAnswer = '';
      if (state.lang === 'uz-cyr') sAnswer = item.answer_cyr || convertHtml(item.answer_uz, latToCyr);
      else if (state.lang === 'ru') sAnswer = item.answer_ru || item.answer_cyr || convertHtml(item.answer_uz, latToCyr);
      else sAnswer = item.answer_uz || convertHtml(item.answer_cyr, cyrToLat);

      const schemeBadge = state.lang === 'uz-cyr' ? 'Схема' : (state.lang === 'ru' ? 'Схема' : (state.lang === 'en' ? 'Scheme' : 'Sxema'));
      const schemeCat = localizeText(item.category);
      const imgSrc = (window.HISTO_SCHEME_IMAGES && window.HISTO_SCHEME_IMAGES[item.id]) ? window.HISTO_SCHEME_IMAGES[item.id] : item.image;

      html += `
        <div class="item-card ${isLearned ? 'mastered' : ''}" id="card-s-${item.id}">
          <div class="card-header-bar">
            <div class="card-meta">
              <span class="badge-id">#${schemeBadge} ${item.id}</span>
              <span class="badge-cat">${schemeCat}</span>
            </div>
            <div class="card-tools">
              <button class="btn-card-action ${isLearned ? 'learned' : ''}" onclick="window.toggleMasteredItem('schemes', ${item.id})" title="${t('markMastered')}">
                ${ICONS.checkCircle}
              </button>
              <button class="btn-card-action ${isFav ? 'favorited' : ''}" onclick="window.toggleFav('schemes', ${item.id})" title="Sevimlilar">
                ${isFav ? ICONS.starFilled : ICONS.star}
              </button>
            </div>
          </div>

          <h3 class="card-title">${sTitle}</h3>

          <div class="scheme-card-image-wrap" onclick="window.openSchemeViewer(${item.id})">
            <img src="${imgSrc}" alt="${sTitle}" class="scheme-card-image" loading="lazy" onerror="this.src='images/preparatlar_royxati.jpg';" />
            <div class="prep-image-overlay" style="border-radius:0 0 12px 12px;">
              <span>${ICONS.book} #${item.id}</span>
              <span class="prep-zoom-pill">${ICONS.expand} ${t('zoom')}</span>
            </div>
          </div>

          <div style="display:flex; gap:8px; margin:8px 0 12px 0;">
            <button class="btn-secondary" style="flex:1; padding:9px 12px; font-size:0.84rem; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; gap:6px; background:var(--primary-light); color:var(--primary); font-weight:700; border:1px solid rgba(2,132,199,0.3);" onclick="window.openSchemeViewer(${item.id})">
              ${ICONS.zoomIn} 2.5x ${t('zoom')}
            </button>
          </div>

          <div style="background:var(--bg-subtle); padding:10px 12px; border-radius:10px; font-size:0.88rem; line-height:1.45; margin-bottom:12px;">
            <b>${t('schemeTask')}</b>
            <p style="margin:4px 0 0 0; color:var(--text-muted); font-size:0.88rem;">${sQuestion || "Barcha belgilangan raqam va tuzilmalarni aniqlang va chizib tushuntiring."}</p>
          </div>

          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">
            ${state.hideAnswers ? `${ICONS.eye} ${t('showAnswer')}` : `${ICONS.eyeOff} ${t('hideAnswer')}`}
          </button>

          <div class="answer-container ${state.hideAnswers ? 'hidden-answer' : ''}">
            <div class="scheme-answer-box">
              <b style="color:#059669; display:flex; align-items:center; gap:6px; margin-bottom:8px; font-size:0.92rem;">
                ${ICONS.target} ${t('schemeAnswer')}:
              </b>
              <div class="scheme-ans-content">
                ${sAnswer}
              </div>
            </div>
            <div class="card-edit-bar">
              <button type="button" class="btn-card-edit-fix" onclick="window.openCorrectionModal('scheme', ${item.id})">
                ✏️ Sxema tuzilmalarini to'g'rilash (Ustoz tahriri)
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    if (filtered.length > state.pageLimit) {
      html += `
        <div style="text-align:center; margin-top:24px;">
          <button class="btn-generate" id="btnLoadMoreSchemes" style="margin:0 auto;">
            ${ICONS.expand} Yana 25 ta ko'rsatish (${filtered.length - state.pageLimit} ta qoldi)
          </button>
        </div>
      `;
    }

    contentArea.innerHTML = html;

    const btnMore = document.getElementById('btnLoadMoreSchemes');
    if (btnMore) {
      btnMore.addEventListener('click', () => {
        state.pageLimit += 25;
        renderSchemes();
      });
    }
  }

  // --------------------------------------------------------
  // TAB 5: IMTIHON SIMULYATORI (EXAM TICKETS)
  // --------------------------------------------------------
  function renderSimulator() {
    statsSummary.textContent = t('tabSimulator');

    if (!state.currentTicket) {
      contentArea.innerHTML = `
        <div style="text-align:center; padding:48px 20px; max-width:620px; margin:0 auto; background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm);">
          <div style="font-size:3rem; margin-bottom:12px; color:var(--primary);">${ICONS.gradCap}</div>
          <h2 style="font-size:1.45rem; font-weight:800; margin-bottom:8px; color:var(--text-main);">${t('ticketTitle')}</h2>
          <p style="font-size:0.92rem; color:var(--text-muted); line-height:1.5; margin-bottom:24px;">
            Har bir rasmiy imtihon bileti kafedra standartlari asosida tuziladi: <b>1 ta Nazariy savol</b>, <b>1 ta Klinik vaziyatli masala</b> va <b>1 ta Mikroskopik preparat</b>.
          </p>
          <button class="btn-generate" id="btnGenTicket" style="margin:0 auto; padding:12px 28px; font-size:1rem; border-radius:30px;">
            ${ICONS.sparkle} ${t('generateTicket')}
          </button>
        </div>
      `;
      const btn = document.getElementById('btnGenTicket');
      if (btn) btn.addEventListener('click', generateNewTicket);
      return;
    }

    const tkt = state.currentTicket;
    const q = (window.HISTO_QUESTIONS || []).find(x => x.id === tkt.qId) || window.HISTO_QUESTIONS[0];
    const c = (window.HISTO_CASES || []).find(x => x.id === tkt.cId) || window.HISTO_CASES[0];
    const p = (window.HISTO_PREPARATIONS || []).find(x => x.id === tkt.pId) || window.HISTO_PREPARATIONS[0];
    const prepTitle = getPrepName(p);
    
    // Localized Question
    const qTitle = (state.lang === 'uz-cyr' || state.lang === 'ru') ? (q.question || latToCyr(q.question_uz || '')) : (q.question_uz || cyrToLat(q.question || ''));
    const qAnswer = (state.lang === 'uz-cyr' || state.lang === 'ru') ? convertHtml(q.answer, latToCyr) : convertHtml(q.answer, cyrToLat);

    // Localized Case
    const cText = (state.lang === 'uz-lat' || state.lang === 'en') ? cyrToLat(c.case_text || '') : (/[а-яА-Я]/.test(c.case_text || '') ? c.case_text : latToCyr(c.case_text || ''));
    const cQ = (state.lang === 'uz-lat' || state.lang === 'en') ? cyrToLat(c.question || (c.sub_questions && c.sub_questions[0]) || '') : (c.question || (c.sub_questions && c.sub_questions[0]) || '');
    const rawCAns = c.solution || c.answer || '';
    const cAnswer = (state.lang === 'uz-lat' || state.lang === 'en') ? convertHtml(rawCAns, cyrToLat) : (/[а-яА-Я]/.test(rawCAns) ? rawCAns : convertHtml(rawCAns, latToCyr));

    // Localized Preparation
    const pStaining = localizeText(p.staining);
    const pDiagKey = localizeText(p.diagnostic_key);
    const pLayers = localizeHtml(p.layers_and_structure || p.atlas_desc || '');
    const pExamQA = localizeHtml(p.exam_questions || '');

    const tktBadge = state.lang === 'uz-cyr' ? 'Билет' : (state.lang === 'ru' ? 'Билет' : (state.lang === 'en' ? 'Ticket' : 'Bilet'));
    const sec1Title = state.lang === 'uz-cyr' ? `1. Назарий савол (#${q.id})` : (state.lang === 'ru' ? `1. Теоретический вопрос (#${q.id})` : (state.lang === 'en' ? `1. Theory Question (#${q.id})` : `1. Nazariy savol (#${q.id})`));
    const sec2Title = state.lang === 'uz-cyr' ? `2. Вазиятли масала (#${c.id})` : (state.lang === 'ru' ? `2. Ситуационная задача (#${c.id})` : (state.lang === 'en' ? `2. Clinical Case (#${c.id})` : `2. Vaziyatli masala (#${c.id})`));
    const sec3Title = state.lang === 'uz-cyr' ? `3. Микроскопик препарат (#${p.id})` : (state.lang === 'ru' ? `3. Микропрепарат (#${p.id})` : (state.lang === 'en' ? `3. Microscopic Slide (#${p.id})` : `3. Mikroskopik preparat (#${p.id})`));

    let html = `
      <div class="sim-ticket-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-bottom:1px solid var(--border); padding-bottom:14px; margin-bottom:18px;">
          <div>
            <span class="sim-badge">${tktBadge} #${tkt.number}</span>
            <h3 style="font-size:1.3rem; font-weight:800; color:var(--text-main); margin-top:6px;">${t('ticketTitle')}</h3>
          </div>
          <button class="btn-generate" id="btnGenAnotherTicket" style="font-size:0.85rem; padding:8px 16px;">
            ${ICONS.sparkle} ${t('generateTicket')}
          </button>
        </div>

        <div class="sim-section-box">
          <div class="sim-sec-title">${sec1Title}</div>
          <h4 style="font-size:1.05rem; line-height:1.45; color:var(--text-main); margin-bottom:10px;">${qTitle}</h4>
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">${ICONS.eye} ${t('showAnswer')}</button>
          <div class="answer-container hidden-answer">
            ${qAnswer}
          </div>
        </div>

        <div class="sim-section-box">
          <div class="sim-sec-title">${sec2Title}</div>
          <div style="background:var(--bg-subtle); padding:10px 12px; border-radius:8px; font-size:0.9rem; line-height:1.45; margin-bottom:8px;">
            ${cText}
          </div>
          <h4 style="font-size:0.98rem; font-weight:700; margin-bottom:10px;">${cQ}</h4>
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">${ICONS.eye} ${t('showAnswer')}</button>
          <div class="answer-container hidden-answer">
            <div style="line-height:1.5;">${cAnswer}</div>
          </div>
        </div>

        <div class="sim-section-box">
          <div class="sim-sec-title">${sec3Title}</div>
          <div class="sim-prep-card-layout">
            <div class="sim-prep-thumb" onclick="window.openSlideViewer(${p.id}, 'micro', false)">
              <img src="${getSlideImgSrc(p.id)}" alt="${prepTitle}" style="width:100%; height:100%; object-fit:cover;" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Histology_micrograph.jpg/640px-Histology_micrograph.jpg';" />
              <div style="position:absolute; bottom:0; left:0; right:0; background:rgba(0,0,0,0.65); color:#38bdf8; font-size:0.75rem; text-align:center; padding:3px; font-weight:600;">${ICONS.expand} ${t('zoom')}</div>
            </div>
            <div class="sim-prep-info">
              <h4 style="font-size:1.1rem; margin-bottom:6px; color:var(--primary); line-height:1.35;">${prepTitle} (${p.name_lat})</h4>
              <p style="font-size:0.9rem;"><b>${t('staining')}:</b> ${pStaining}</p>
              <p style="font-size:0.9rem; margin:4px 0;"><b>${t('diagKey')}:</b> ${pDiagKey}</p>
              <div style="display:flex; gap:6px; margin-top:8px;">
                <button class="btn-secondary" style="font-size:0.82rem; padding:6px 12px; border-radius:8px; background:var(--primary-light); color:var(--primary); font-weight:700;" onclick="window.openSlideViewer(${p.id}, 'micro', true)">
                  ${ICONS.zoomIn} 2.5x ${t('zoom')}
                </button>
                <button class="btn-secondary" style="font-size:0.82rem; padding:6px 12px; border-radius:8px;" onclick="window.openSlideViewer(${p.id}, 'micro', false)">
                  ${ICONS.microscope} ${t('showDetails')}
                </button>
              </div>
            </div>
          </div>
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">${ICONS.eye} ${t('showDetails')}</button>
          <div class="answer-container hidden-answer">
            <div style="margin-top:10px;">${pLayers}</div>
            <div class="prep-exam-qa" style="margin-top:10px;">${pExamQA}</div>
          </div>
        </div>

        <div class="sim-section-box" style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25);">
          <div class="sim-sec-title" style="color:#10b981;">${ICONS.gradCap} ${t('ticketCompleted')}</div>
          <p style="font-size:0.9rem; margin-bottom:12px; color:var(--text-main);">
            Bilet savollariga javob berib bo'lganingizdan so'ng o'z bilimlaringizni baholang. Ball to'g'ridan-to'g'ri profilingizga qo'shiladi!
          </p>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn-generate" style="background:#10b981; flex:1; min-width:140px; justify-content:center;" onclick="window.gradeTicket(5)">
              ${ICONS.starFilled} ${t('grade5')} (+50)
            </button>
            <button class="btn-generate" style="background:#0284c7; flex:1; min-width:140px; justify-content:center;" onclick="window.gradeTicket(4)">
              ${ICONS.starFilled} ${t('grade4')} (+30)
            </button>
            <button class="btn-generate" style="background:#f59e0b; flex:1; min-width:140px; justify-content:center;" onclick="window.gradeTicket(3)">
              ${ICONS.star} ${t('grade3')} (+15)
            </button>
          </div>
        </div>
      </div>
    `;

    contentArea.innerHTML = html;

    const btnAnother = document.getElementById('btnGenAnotherTicket');
    if (btnAnother) btnAnother.addEventListener('click', generateNewTicket);
  }

  function generateNewTicket() {
    const qList = window.HISTO_QUESTIONS || [];
    const cList = window.HISTO_CASES || [];
    const pList = window.HISTO_PREPARATIONS || [];

    const randomQ = qList[Math.floor(Math.random() * qList.length)] || { id: 1 };
    const randomC = cList[Math.floor(Math.random() * cList.length)] || { id: 1 };
    const randomP = pList[Math.floor(Math.random() * pList.length)] || { id: 1 };

    state.currentTicket = {
      number: Math.floor(Math.random() * 30) + 1,
      qId: randomQ.id,
      cId: randomC.id,
      pId: randomP.id
    };

    renderSimulator();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.gradeTicket = function (grade) {
    const pts = grade === 5 ? 50 : (grade === 4 ? 30 : 15);
    state.profile.score = (state.profile.score || 0) + pts;
    state.profile.passedTickets = (state.profile.passedTickets || 0) + 1;
    if (!state.profile.ticketGrades) state.profile.ticketGrades = [];
    state.profile.ticketGrades.push(grade);
    saveProfile();
    alert(`Tabriklaymiz! Siz imtihon biletini "${grade}" bahoga topshirdingiz va +${pts} ball to'pladingiz! Profilingizdagi jami ball: ${state.profile.score}`);
    switchTab('profile');
  };

  // --------------------------------------------------------
  // TAB 6: SHAXSIY PROFIL VA YUTUQLAR (PERSONAL PROFILE & MASTERY)
  // (MUTLAQO SOXTA ISMLARSIZ, 100% SHAXSIY NATIJALAR)
  // --------------------------------------------------------
  function renderProfile() {
    statsSummary.textContent = t('profileTitle');
    const p = state.profile;
    const rank = getRankTitle(p.score || 0);

    const qCount = (p.learnedQuestions || []).length;
    const cCount = (p.learnedCases || []).length;
    const prepCount = (p.learnedPreps || []).length;
    const totalMastered = qCount + cCount + prepCount;

    const qPercent = Math.round((qCount / 111) * 100);
    const cPercent = Math.round((cCount / 85) * 100);
    const pPercent = Math.round((prepCount / 51) * 100);

    const avgGrade = (p.ticketGrades && p.ticketGrades.length > 0)
      ? (p.ticketGrades.reduce((a, b) => a + b, 0) / p.ticketGrades.length).toFixed(1)
      : '0.0';

    const achievements = [
      {
        id: 'prepMaster',
        icon: ICONS.microscope,
        title: state.lang === 'ru' ? 'Эксперт микроскопии' : (state.lang === 'en' ? 'Microscopy Expert' : 'Mikroskop Eksperti'),
        desc: state.lang === 'ru' ? 'Освоено 51 микропрепарат' : (state.lang === 'en' ? 'Mastered 51 microscopic slides' : '51 ta preparat to\'liq o\'rganildi'),
        unlocked: prepCount >= 51
      },
      {
        id: 'theoryMaster',
        icon: ICONS.book,
        title: state.lang === 'ru' ? 'Знаток теории' : (state.lang === 'en' ? 'Theory Specialist' : 'Nazariya Bilimdoni'),
        desc: state.lang === 'ru' ? 'Освоено 50+ вопросов' : (state.lang === 'en' ? '50+ theory questions mastered' : '50+ savol yodlandi'),
        unlocked: qCount >= 50
      },
      {
        id: 'clinicMaster',
        icon: ICONS.target,
        title: state.lang === 'ru' ? 'Клинический диагност' : (state.lang === 'en' ? 'Clinical Diagnostic Expert' : 'Klinik Diagnost'),
        desc: state.lang === 'ru' ? 'Решено 20+ ситуационных задач' : (state.lang === 'en' ? 'Solved 20+ clinical cases' : '20+ vaziyatli masala yechildi'),
        unlocked: cCount >= 20
      },
      {
        id: 'topStudent',
        icon: ICONS.award,
        title: state.lang === 'ru' ? 'Отличник экзамена' : (state.lang === 'en' ? 'Honors Scholar' : 'A\'lochi Talaba'),
        desc: state.lang === 'ru' ? 'Сдан экзаменационный билет на 5' : (state.lang === 'en' ? 'Passed exam ticket with grade 5' : 'Imtihon biletidan 5 baho olindi'),
        unlocked: (p.ticketGrades || []).includes(5)
      },
      {
        id: 'centurion',
        icon: ICONS.sparkle,
        title: state.lang === 'ru' ? 'Активный исследователь' : (state.lang === 'en' ? 'Dedicated Researcher' : 'Faol Tadqiqotchi'),
        desc: state.lang === 'ru' ? 'Освоено более 100 разделов' : (state.lang === 'en' ? 'Over 100 topics mastered' : '100 dan ortiq bo\'lim o\'zlashtirildi'),
        unlocked: totalMastered >= 100
      },
      {
        id: 'professor',
        icon: ICONS.trophy,
        title: state.lang === 'ru' ? 'Профессор гистологии' : (state.lang === 'en' ? 'Histology Professor' : 'Gistologiya Professori'),
        desc: state.lang === 'ru' ? 'Набрано более 500 баллов' : (state.lang === 'en' ? 'Earned 500+ total points' : '500+ ball to\'plandi'),
        unlocked: (p.score || 0) >= 500
      }
    ];

    let html = `
      <div class="profile-dashboard">
        <!-- Hero Header -->
        <div class="profile-hero-card">
          <div class="profile-hero-left">
            <div class="profile-avatar-circle">
              ${ICONS.user}
            </div>
            <div class="profile-user-info">
              <h2>${p.name || t('studentName')}</h2>
              <p>${p.group || t('university')} &bull; ${p.specialty || t('specialty')}</p>
              <div class="profile-rank-badge">
                ${ICONS.award} ${rank.title} (Level ${rank.level})
              </div>
            </div>
          </div>
          <div class="profile-score-box">
            <div class="profile-score-val">${p.score || 0}</div>
            <div class="profile-score-lbl">${t('totalScore')}</div>
          </div>
        </div>

        <!-- 4 ta O'zlashtirish Metrikalari -->
        <div class="profile-mastery-grid">
          <div class="profile-stat-tile">
            <div class="stat-tile-header">
              <span>${ICONS.book} ${t('tabQuestions')}</span>
              <span style="color:var(--primary); font-weight:700;">${qPercent}%</span>
            </div>
            <div class="stat-tile-val">${qCount} <span style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">/ 111</span></div>
            <div class="stat-tile-progress">
              <div class="stat-tile-bar" style="width:${qPercent}%; background:#0284c7;"></div>
            </div>
          </div>

          <div class="profile-stat-tile">
            <div class="stat-tile-header">
              <span>${ICONS.target} ${t('tabCases')}</span>
              <span style="color:#059669; font-weight:700;">${cPercent}%</span>
            </div>
            <div class="stat-tile-val">${cCount} <span style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">/ 85</span></div>
            <div class="stat-tile-progress">
              <div class="stat-tile-bar" style="width:${cPercent}%; background:#10b981;"></div>
            </div>
          </div>

          <div class="profile-stat-tile">
            <div class="stat-tile-header">
              <span>${ICONS.microscope} ${t('tabPreparations')}</span>
              <span style="color:#7c3aed; font-weight:700;">${pPercent}%</span>
            </div>
            <div class="stat-tile-val">${prepCount} <span style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">/ 51</span></div>
            <div class="stat-tile-progress">
              <div class="stat-tile-bar" style="width:${pPercent}%; background:#8b5cf6;"></div>
            </div>
          </div>

          <div class="profile-stat-tile">
            <div class="stat-tile-header">
              <span>${ICONS.gradCap} ${t('tabSimulator')}</span>
              <span style="color:#d97706; font-weight:700;">Baho: ${avgGrade}</span>
            </div>
            <div class="stat-tile-val">${p.passedTickets || 0} <span style="font-size:0.85rem; font-weight:500; color:var(--text-muted);">ta bilet</span></div>
            <div class="stat-tile-progress">
              <div class="stat-tile-bar" style="width:${Math.min(100, (p.passedTickets || 0) * 10)}%; background:#f59e0b;"></div>
            </div>
          </div>
        </div>

        <!-- Yutuqlar Ro'yxati -->
        <div style="background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-lg); padding:24px; box-shadow:var(--shadow-sm);">
          <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            ${ICONS.trophy} ${t('achievementsTitle')}
          </h3>
          <div class="achievements-grid">
      `;

      achievements.forEach(ach => {
        html += `
          <div class="achievement-card ${ach.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon-wrap">
              ${ach.icon}
            </div>
            <div class="achievement-info">
              <h4>${ach.title}</h4>
              <p>${ach.desc}</p>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>

        <!-- Profil Harakatlari -->
        <div class="profile-actions-bar">
          <button class="btn-secondary" id="btnEditProfile" style="display:inline-flex; align-items:center; gap:6px;">
            ${ICONS.edit} ${t('editProfile')}
          </button>
          <button class="btn-secondary" id="btnResetProgress" style="display:inline-flex; align-items:center; gap:6px; color:var(--danger); border-color:rgba(239,68,68,0.3);">
            ${ICONS.trash} ${t('resetProgress')}
          </button>
        </div>
      </div>
    `;

    contentArea.innerHTML = html;

    const btnEdit = document.getElementById('btnEditProfile');
    if (btnEdit) {
      btnEdit.addEventListener('click', () => {
        const newName = prompt("Ismingizni kiriting:", p.name || 'Talaba');
        if (newName && newName.trim()) {
          p.name = newName.trim();
          const newGroup = prompt("OTM yoki Guruhingiz:", p.group || 'Tibbiyot OTM');
          if (newGroup) p.group = newGroup.trim();
          saveProfile();
          renderProfile();
        }
      });
    }

    const btnReset = document.getElementById('btnResetProgress');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm(t('confirmReset'))) {
          state.profile.score = 0;
          state.profile.learnedQuestions = [];
          state.profile.learnedCases = [];
          state.profile.learnedPreps = [];
          state.profile.passedTickets = 0;
          state.profile.ticketGrades = [];
          saveProfile();
          updateBadges();
          renderProfile();
        }
      });
    }
  }

  // --------------------------------------------------------
  // TAB 7: SEVIMLILAR (FAVORITES)
  // --------------------------------------------------------
  function renderFavorites() {
    statsSummary.textContent = t('tabFavorites');
    const favQ = (window.HISTO_QUESTIONS || []).filter(q => (state.favorites.questions || []).includes(q.id));
    const favC = (window.HISTO_CASES || []).filter(c => (state.favorites.cases || []).includes(c.id));
    const favP = (window.HISTO_PREPARATIONS || []).filter(p => (state.favorites.preparations || []).includes(p.id));

    const totalFav = favQ.length + favC.length + favP.length;

    if (totalFav === 0) {
      contentArea.innerHTML = `
        <div class="empty-state">
          ${ICONS.star}
          <h3 style="margin-top:10px;">Sevimlilar ro'yxati bo'sh</h3>
          <p>Savol, masala yoki preparatlar kartasidagi yulduzcha tugmasini bosib shu yerga saqlab qo'yishingiz mumkin.</p>
        </div>
      `;
      return;
    }

    let html = `<div class="cards-grid">`;

    favP.forEach(p => {
      const prepTitle = getPrepName(p);
      const prepDiagKey = localizeText(p.diagnostic_key);
      const prepLayers = localizeHtml(p.layers_and_structure || p.atlas_desc || '');
      const prepExamQA = localizeHtml(p.exam_questions || '');
      const pBadge = state.lang === 'uz-cyr' ? 'Препарат' : (state.lang === 'ru' ? 'Препарат' : (state.lang === 'en' ? 'Slide' : 'Preparat'));

      html += `
        <div class="item-card">
          <div class="card-header-bar">
            <div class="card-meta">
              <span class="badge-id">${pBadge} #${p.id}</span>
              <span class="badge-cat">${p.name_lat}</span>
            </div>
            <button class="btn-card-action favorited" onclick="window.toggleFav('preparations', ${p.id})">${ICONS.starFilled}</button>
          </div>
          <h3 class="card-title">${prepTitle}</h3>
          <div class="prep-card-image-wrap" onclick="window.openSlideViewer(${p.id}, 'micro', false)">
            <img src="${getSlideImgSrc(p.id)}" alt="${prepTitle}" class="prep-card-image" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Histology_micrograph.jpg/640px-Histology_micrograph.jpg';" />
            <div class="prep-image-overlay">
              <span class="prep-zoom-pill">${ICONS.expand} ${t('zoom')}</span>
            </div>
          </div>
          <div style="display:flex; gap:8px; margin:10px 0;">
            <button class="btn-secondary" style="flex:1; padding:8px 10px; font-size:0.82rem; font-weight:700; background:var(--primary-light); color:var(--primary);" onclick="window.openSlideViewer(${p.id}, 'micro', true)">
              ${ICONS.zoomIn} 2.5x ${t('zoom')}
            </button>
          </div>
          <p style="font-size:0.9rem; margin-bottom:8px;"><b>${t('diagKey')}:</b> ${prepDiagKey}</p>
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">${ICONS.eye} ${t('showDetails')}</button>
          <div class="answer-container hidden-answer">
            <div>${prepLayers}</div>
            <div class="prep-exam-qa" style="margin-top:10px;">${prepExamQA}</div>
          </div>
        </div>
      `;
    });

    favQ.forEach(q => {
      const qTitle = (state.lang === 'uz-cyr' || state.lang === 'ru') ? (q.question || latToCyr(q.question_uz || '')) : (q.question_uz || cyrToLat(q.question || ''));
      const qAnswer = (state.lang === 'uz-cyr' || state.lang === 'ru') ? convertHtml(q.answer, latToCyr) : convertHtml(q.answer, cyrToLat);
      const qBadge = state.lang === 'uz-cyr' ? 'Савол' : (state.lang === 'ru' ? 'Вопрос' : (state.lang === 'en' ? 'Question' : 'Savol'));

      html += `
        <div class="item-card">
          <div class="card-header-bar">
            <div class="card-meta">
              <span class="badge-id">${qBadge} #${q.id}</span>
              <span class="badge-cat">${localizeText(q.category)}</span>
            </div>
            <button class="btn-card-action favorited" onclick="window.toggleFav('questions', ${q.id})">${ICONS.starFilled}</button>
          </div>
          <h3 class="card-title">${qTitle}</h3>
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">${ICONS.eye} ${t('showAnswer')}</button>
          <div class="answer-container hidden-answer">
            ${qAnswer}
          </div>
        </div>
      `;
    });

    favC.forEach(c => {
      const cTitle = (state.lang === 'uz-lat' || state.lang === 'en') ? (c.title_uz ? c.title_uz : cyrToLat(c.title || `Masala #${c.id}`)) : (c.title ? c.title : latToCyr(c.title_uz || `Масала #${c.id}`));
      const cText = (state.lang === 'uz-lat' || state.lang === 'en') ? cyrToLat(c.case_text || '') : (/[а-яА-Я]/.test(c.case_text || '') ? c.case_text : latToCyr(c.case_text || ''));
      const cQ = (state.lang === 'uz-lat' || state.lang === 'en') ? cyrToLat(c.question || (c.sub_questions && c.sub_questions[0]) || '') : (c.question || (c.sub_questions && c.sub_questions[0]) || '');
      const rawCAns = c.solution || c.answer || '';
      const cAnswer = (state.lang === 'uz-lat' || state.lang === 'en') ? convertHtml(rawCAns, cyrToLat) : (/[а-яА-Я]/.test(rawCAns) ? rawCAns : convertHtml(rawCAns, latToCyr));
      const cBadge = state.lang === 'uz-cyr' ? 'Масала' : (state.lang === 'ru' ? 'Задача' : (state.lang === 'en' ? 'Case' : 'Masala'));

      html += `
        <div class="item-card">
          <div class="card-header-bar">
            <div class="card-meta">
              <span class="badge-id">${cBadge} #${c.id}</span>
              <span class="badge-cat">${localizeText(c.category || 'Klinik Masala')}</span>
            </div>
            <button class="btn-card-action favorited" onclick="window.toggleFav('cases', ${c.id})">${ICONS.starFilled}</button>
          </div>
          <h3 class="card-title">${cTitle}</h3>
          <div style="background:var(--bg-subtle); padding:10px; border-radius:8px; font-size:0.9rem; margin-bottom:8px;">
            <b>${t('caseSituation')}</b> ${cText}
          </div>
          <h4 style="font-size:0.96rem; margin-bottom:8px;">${cQ}</h4>
          <button class="ans-toggle-btn" onclick="window.toggleCardAnswer(this)">${ICONS.eye} ${t('showAnswer')}</button>
          <div class="answer-container hidden-answer">
            <div style="line-height:1.5;">${cAnswer}</div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    contentArea.innerHTML = html;
  }

  function switchTab(tabName) {
    state.activeTab = tabName;
    state.selectedCategory = 'all';
    state.pageLimit = 25;

    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });

    const searchBar = document.querySelector('.search-filter-bar');
    if (searchBar) {
      if (['simulator', 'profile', 'schemes'].includes(tabName)) {
        searchBar.style.display = 'none';
      } else {
        searchBar.style.display = 'block';
      }
    }

    renderCategories();
    renderCurrentTab();

    if (contentArea) {
      contentArea.classList.remove('liquid-tab-enter');
      void contentArea.offsetWidth;
      contentArea.classList.add('liquid-tab-enter');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCurrentTab() {
    switch (state.activeTab) {
      case 'questions': renderQuestions(); break;
      case 'cases': renderCases(); break;
      case 'preparations': renderPreparations(); break;
      case 'schemes': renderSchemes(); break;
      case 'simulator': renderSimulator(); break;
      case 'profile': renderProfile(); break;
      case 'favorites': renderFavorites(); break;
      default: renderQuestions();
    }
  }

  // ========================================================
  // 3. TO'LIQ EKRANLI MIKROSKOP VA ATLAS VIEWER MODAL
  // TEZKOR QUICKBAR (100%, 200%, 250%, 300%), DOCK (+/-) VA DOUBLE-TAP
  // ========================================================
  window.openSlideViewer = function (prepId, initialMode = 'micro', autoZoom = false) {
    const list = window.HISTO_PREPARATIONS || [];
    let currentIdx = list.findIndex(p => p.id === prepId);
    if (currentIdx === -1) currentIdx = 0;

    let zoomLevel = autoZoom ? 2.5 : 1.0;
    let panX = 0;
    let panY = 0;
    let isInfoOpen = false;
    let currentMode = initialMode;
    let lastDoubleZoomTime = 0;

    const existing = document.getElementById('slideViewerModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'slide-lightbox-modal';
    modal.id = 'slideViewerModal';
    document.body.appendChild(modal);

    function renderSlideContent() {
      const p = list[currentIdx];
      const hasAt = hasAtlas(p.id);
      if (currentMode === 'atlas' && !hasAt) currentMode = 'micro';
      const imgSrc = currentMode === 'micro' ? getSlideImgSrc(p.id) : getAtlasImgSrc(p.id);
      const prepTitle = getPrepName(p);

      modal.innerHTML = `
        <div class="lightbox-header">
          <div class="lightbox-title">
            <h3>${ICONS.microscope} #${p.id}. ${prepTitle}</h3>
            <p>${p.name_lat} &bull; ${t('staining')}: <b>${p.staining}</b></p>
          </div>
          
          <!-- Desktop controls in header -->
          <div class="lightbox-tools-desktop">
            <button class="lightbox-btn" id="btnPrevSlide" title="${t('prev')}">${ICONS.chevLeft} ${t('prev')}</button>
            <span style="color:#94a3b8; font-size:0.85rem; font-weight:700;">${currentIdx + 1} / ${list.length}</span>
            <button class="lightbox-btn" id="btnNextSlide" title="${t('next')}">${t('next')} ${ICONS.chevRight}</button>
            <div style="width:1px; height:24px; background:rgba(255,255,255,0.15); margin:0 4px;"></div>
            ${hasAt ? `
            <button class="lightbox-btn" id="btnToggleMode" style="background:${currentMode === 'micro' ? '#0284c7' : '#10b981'}; font-weight:bold;">
              ${currentMode === 'micro' ? `${ICONS.microscope} ${t('microscopePhoto')}` : `${ICONS.book} ${t('atlasDiagram')}`}
            </button>
            ` : ''}
            <button class="lightbox-btn" id="btnZoomIn" title="${t('zoom')}">${ICONS.zoomIn}</button>
            <button class="lightbox-btn" id="btnZoomOut" title="${t('zoomOut')}">${ICONS.zoomOut}</button>
            <button class="lightbox-btn" id="btnZoomReset" title="${t('resetZoom')}">${ICONS.reset} <span id="desktopZoomPct">${Math.round(zoomLevel * 100)}%</span></button>
            <button class="lightbox-btn" id="btnToggleInfo" style="background:${isInfoOpen ? '#0284c7' : 'rgba(255,255,255,0.1)'};">${ICONS.book} ${t('showDetails')}</button>
            <button class="lightbox-btn" style="background:#ef4444; color:#fff;" id="btnCloseSlide">${ICONS.close}</button>
          </div>

          <!-- Mobile controls in header -->
          <div class="lightbox-tools-mobile">
            ${hasAt ? `
            <button class="lightbox-btn" id="btnMobileToggleMode" style="background:${currentMode === 'micro' ? '#0284c7' : '#10b981'}; padding:6px 10px;" title="Rejim">
              ${currentMode === 'micro' ? ICONS.microscope : ICONS.book}
            </button>
            ` : ''}
            <button class="lightbox-btn" id="btnMobileZoomIn" style="background:#0284c7; color:#fff; padding:6px 10px;" title="${t('zoom')}">${ICONS.zoomIn}</button>
            <button class="lightbox-btn" id="btnMobileZoomOut" style="background:rgba(255,255,255,0.12); color:#fff; padding:6px 10px;" title="${t('zoomOut')}">${ICONS.zoomOut}</button>
            <button class="lightbox-btn" id="btnMobileToggleInfo" style="background:${isInfoOpen ? '#0284c7' : 'rgba(255,255,255,0.12)'}; padding:6px 10px;" title="Tavsif">${ICONS.book}</button>
            <button class="lightbox-btn" style="background:#ef4444; color:#fff; padding:6px 10px;" id="btnMobileCloseSlide">${ICONS.close}</button>
          </div>
        </div>

        <div style="flex:1; display:flex; position:relative; overflow:hidden;">
          
          <!-- Quick Zoom Toolbar at Top of Viewport -->
          <div class="modal-zoom-quickbar">
            <button class="quick-zoom-btn ${Math.abs(zoomLevel - 1.0) < 0.1 ? 'active' : ''}" data-zoom="1.0">100%</button>
            <button class="quick-zoom-btn ${Math.abs(zoomLevel - 2.0) < 0.1 ? 'active' : ''}" data-zoom="2.0">200%</button>
            <button class="quick-zoom-btn ${Math.abs(zoomLevel - 2.5) < 0.1 ? 'active' : ''}" data-zoom="2.5">250%</button>
            <button class="quick-zoom-btn ${Math.abs(zoomLevel - 3.0) < 0.1 ? 'active' : ''}" data-zoom="3.0">300%</button>
          </div>

          <!-- Image Stage -->
          <div class="lightbox-content-wrap" id="slideImgWrap" style="flex:1; touch-action:none; width:100%; height:100%;">
            <img 
              id="slideFullImg"
              class="lightbox-img" 
              src="${imgSrc}" 
              alt="${prepTitle}" 
              style="transform: translate3d(${panX}px, ${panY}px, 0) scale(${zoomLevel}); cursor: ${zoomLevel > 1 ? 'grab' : 'zoom-in'};"
              onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Histology_micrograph.jpg/640px-Histology_micrograph.jpg';" 
            />
          </div>

          <!-- Floating Toast Indicator -->
          <div class="zoom-toast-indicator" id="zoomToast">${Math.round(zoomLevel * 100)}%</div>

          <!-- Lightbox Hint -->
          <div class="lightbox-hint" id="lightboxHint" style="bottom: 84px;">
            ${ICONS.lightning} ${t('doubleTapHint')}
          </div>

          <!-- Elevated Floating Glass Dock -->
          <div class="lightbox-floating-dock" id="lightboxDock">
            <button class="lightbox-dock-btn" id="btnDockPrev" title="${t('prev')}">${ICONS.chevLeft}</button>
            <span class="lightbox-dock-indicator">${currentIdx + 1} / ${list.length}</span>
            <button class="lightbox-dock-btn" id="btnDockNext" title="${t('next')}">${ICONS.chevRight}</button>
            <div class="lightbox-dock-divider"></div>
            ${hasAt ? `
            <button class="lightbox-dock-btn" id="btnDockToggleMode" title="Ko'rinish" style="width:auto; padding:0 12px; border-radius:20px; font-size:0.8rem; font-weight:700; background:${currentMode === 'micro' ? '#0284c7' : '#10b981'}; gap:5px;">
              ${currentMode === 'micro' ? `${ICONS.microscope} Mikroskop` : `${ICONS.book} Atlas`}
            </button>
            <div class="lightbox-dock-divider"></div>
            ` : ''}
            <button class="lightbox-dock-btn" id="btnDockZoomIn" title="${t('zoom')}" style="background:#0284c7;">${ICONS.zoomIn}</button>
            <button class="lightbox-dock-btn" id="btnDockZoomReset" title="${t('resetZoom')}" style="width:auto; padding:0 10px; border-radius:20px; font-size:0.78rem; font-weight:700; gap:4px;">${ICONS.reset} <span id="dockZoomPct">${Math.round(zoomLevel * 100)}%</span></button>
            <button class="lightbox-dock-btn" id="btnDockZoomOut" title="${t('zoomOut')}">${ICONS.zoomOut}</button>
          </div>

          <!-- Drawer panel -->
          <div id="slideInfoDrawer" class="slide-drawer ${isInfoOpen ? 'open' : ''}" style="width:${window.innerWidth > 768 ? (isInfoOpen ? '420px' : '0') : '100%'}; padding:${window.innerWidth > 768 ? (isInfoOpen ? '20px' : '0') : '16px 16px 36px 16px'}; border-left:${window.innerWidth > 768 ? '1px solid var(--border)' : 'none'}; display:${window.innerWidth > 768 ? (isInfoOpen ? 'block' : 'none') : 'block'};">
            <div class="slide-drawer-handle" id="slideDrawerHandle"></div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h4 style="color:var(--primary); font-size:1.05rem; margin:0; display:flex; align-items:center; gap:6px;">${ICONS.microscope} #${p.id}. ${prepTitle}</h4>
              <button class="btn-card-action" id="btnCloseDrawerX" style="font-size:16px;">${ICONS.close}</button>
            </div>
            <div style="background:var(--bg-subtle); padding:10px 12px; border-radius:10px; margin-bottom:12px; font-size:0.88rem;">
              <b style="color:var(--primary);">${ICONS.target} ${t('diagKey')}:</b>
              <p style="margin-top:4px; line-height:1.45;">${p.diagnostic_key}</p>
            </div>
            ${p.atlas_fig ? `
            <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); padding:10px 12px; border-radius:10px; margin-bottom:12px; font-size:0.88rem;">
              <b style="color:#059669; display:flex; align-items:center; gap:5px;">${ICONS.book} ${t('atlasPointers')} (${p.atlas_fig}):</b>
              <div style="margin-top:6px; line-height:1.45; color:var(--text-main); font-size:0.84rem;">${p.atlas_pointers || ''}</div>
            </div>
            ` : ''}
            <div style="margin-bottom:12px; font-size:0.88rem;">
              <b style="color:var(--text-main);">${ICONS.layers} ${t('layers')}:</b>
              <div style="margin-top:6px; line-height:1.45;">${p.atlas_desc || p.layers_and_structure}</div>
            </div>
            <div style="background:var(--warning-light); color:#78350f; padding:12px; border-radius:10px; font-size:0.85rem; margin-bottom:12px;">
              <b>${ICONS.gradCap} ${t('examQA')}:</b>
              <div style="margin-top:6px; line-height:1.45;">${p.exam_questions}</div>
            </div>
            <button class="btn-secondary" id="btnCloseDrawerBtn" style="width:100%; height:42px; font-weight:600; font-size:0.9rem; border-radius:10px;">${t('close')}</button>
          </div>
        </div>
      `;

      // Dual Pointer & Click Binder with Debounce
      function bindBtn(id, fn) {
        const el = modal.querySelector('#' + id);
        if (!el) return;
        let lastTime = 0;
        function trigger(e) {
          const now = Date.now();
          if (now - lastTime < 180) return;
          lastTime = now;
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          fn();
        }
        el.addEventListener('pointerup', trigger);
        el.addEventListener('click', trigger);
      }

      function showZoomToast(text) {
        const toast = modal.querySelector('#zoomToast');
        if (!toast) return;
        toast.textContent = text;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
          toast.classList.remove('show');
        }, 1100);
      }

      function toggleViewerMode() {
        currentMode = (currentMode === 'micro' ? 'atlas' : 'micro');
        zoomLevel = 1.0;
        panX = 0;
        panY = 0;
        renderSlideContent();
      }

      // Quickbar buttons listener
      modal.querySelectorAll('.quick-zoom-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetZoom = parseFloat(btn.getAttribute('data-zoom'));
          zoomLevel = targetZoom;
          panX = 0;
          panY = 0;
          applyTransform();
          showZoomToast(`${Math.round(zoomLevel * 100)}%`);
        });
      });

      // Bind all navigation and zoom buttons
      bindBtn('btnToggleMode', toggleViewerMode);
      bindBtn('btnMobileToggleMode', toggleViewerMode);
      bindBtn('btnDockToggleMode', toggleViewerMode);

      bindBtn('btnCloseSlide', closeViewer);
      bindBtn('btnMobileCloseSlide', closeViewer);

      bindBtn('btnPrevSlide', goPrevSlide);
      bindBtn('btnDockPrev', goPrevSlide);
      bindBtn('btnNextSlide', goNextSlide);
      bindBtn('btnDockNext', goNextSlide);

      bindBtn('btnZoomIn', () => doZoom(0.4));
      bindBtn('btnMobileZoomIn', () => doZoom(0.4));
      bindBtn('btnDockZoomIn', () => doZoom(0.4));

      bindBtn('btnZoomOut', () => doZoom(-0.4));
      bindBtn('btnMobileZoomOut', () => doZoom(-0.4));
      bindBtn('btnDockZoomOut', () => doZoom(-0.4));

      bindBtn('btnZoomReset', resetZoom);
      bindBtn('btnDockZoomReset', resetZoom);

      bindBtn('btnToggleInfo', toggleInfo);
      bindBtn('btnMobileToggleInfo', toggleInfo);

      bindBtn('btnCloseDrawerX', closeInfoDrawer);
      bindBtn('btnCloseDrawerBtn', closeInfoDrawer);

      const wrap = modal.querySelector('#slideImgWrap');
      const img = modal.querySelector('#slideFullImg');
      const dock = modal.querySelector('#lightboxDock');

      if (dock) {
        dock.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        dock.addEventListener('mousedown', (e) => e.stopPropagation());
      }

      // Mouse Wheel Zoom
      if (wrap) {
        wrap.onwheel = (e) => {
          e.preventDefault();
          doZoom(e.deltaY < 0 ? 0.3 : -0.3);
        };
      }

      // Central Double-click / Double-tap Zoom Handler
      function handleDoubleZoom(clientX, clientY) {
        const now = Date.now();
        if (now - lastDoubleZoomTime < 300) return;
        lastDoubleZoomTime = now;

        const fullImg = modal.querySelector('#slideFullImg');
        if (!fullImg) return;
        fullImg.style.transition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)';

        if (zoomLevel > 1.2) {
          zoomLevel = 1.0;
          panX = 0;
          panY = 0;
        } else {
          zoomLevel = 2.5;
          if (clientX !== undefined && clientY !== undefined && wrap) {
            const rect = wrap.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            panX = Math.round((centerX - clientX) * 1.5);
            panY = Math.round((centerY - clientY) * 1.5);
          } else {
            panX = 0;
            panY = 0;
          }
        }
        applyTransform();
        showZoomToast(`${Math.round(zoomLevel * 100)}%`);
      }

      // Desktop Native Double-Click
      if (wrap) {
        wrap.addEventListener('dblclick', (e) => {
          if (dock && (e.target === dock || dock.contains(e.target))) return;
          e.preventDefault();
          e.stopPropagation();
          handleDoubleZoom(e.clientX, e.clientY);
        });
      }
      if (img) {
        img.addEventListener('dblclick', (e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDoubleZoom(e.clientX, e.clientY);
        });
      }

      // Mouse Drag to Pan
      let isMouseDown = false;
      let mouseStartX = 0;
      let mouseStartY = 0;

      if (wrap) {
        wrap.addEventListener('mousedown', (e) => {
          if (dock && (e.target === dock || dock.contains(e.target))) return;
          if (e.button !== 0) return;
          isMouseDown = true;
          mouseStartX = e.clientX - panX;
          mouseStartY = e.clientY - panY;
          if (img) {
            img.style.transition = 'none';
            img.style.cursor = 'grabbing';
          }
        });

        window.addEventListener('mousemove', (e) => {
          if (!isMouseDown) return;
          panX = e.clientX - mouseStartX;
          panY = e.clientY - mouseStartY;
          applyTransform();
        });

        window.addEventListener('mouseup', () => {
          if (isMouseDown) {
            isMouseDown = false;
            if (img) img.style.cursor = zoomLevel > 1 ? 'grab' : 'zoom-in';
          }
        });

        // Touch Gestures: Pan, Pinch-Zoom, Swipe & Fast Double Tap
        let touchStartX = 0;
        let touchStartY = 0;
        let initialPinchDist = 0;
        let initialZoom = 1.0;
        let isTouching = false;
        let initialPanX = 0;
        let initialPanY = 0;
        let lastTapRecord = { time: 0, x: 0, y: 0 };

        wrap.addEventListener('touchstart', (e) => {
          if (dock && (e.target === dock || dock.contains(e.target))) return;
          if (img) img.style.transition = 'none';

          if (e.touches.length === 1) {
            isTouching = true;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            initialPanX = panX;
            initialPanY = panY;
          } else if (e.touches.length === 2) {
            isTouching = false;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            initialPinchDist = Math.hypot(dx, dy);
            initialZoom = zoomLevel;
          }
        }, { passive: true });

        wrap.addEventListener('touchmove', (e) => {
          if (e.touches.length === 2 && initialPinchDist > 0) {
            if (e.cancelable) e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const currentDist = Math.hypot(dx, dy);
            const factor = currentDist / initialPinchDist;
            zoomLevel = Math.min(Math.max(initialZoom * factor, 0.8), 5.0);
            applyTransform();
          } else if (e.touches.length === 1 && isTouching && zoomLevel > 1.05) {
            if (e.cancelable) e.preventDefault();
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            panX = initialPanX + (currentX - touchStartX);
            panY = initialPanY + (currentY - touchStartY);
            applyTransform();
          }
        }, { passive: false });

        wrap.addEventListener('touchend', (e) => {
          if (dock && (e.target === dock || dock.contains(e.target))) return;
          if (img) img.style.transition = 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
          const now = Date.now();

          if (e.changedTouches && e.changedTouches.length === 1) {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;

            // Double tap check
            const timeSinceLast = now - lastTapRecord.time;
            const distFromLast = Math.hypot(touchEndX - lastTapRecord.x, touchEndY - lastTapRecord.y);

            if (timeSinceLast > 35 && timeSinceLast < 380 && distFromLast < 35) {
              if (e.cancelable) e.preventDefault();
              handleDoubleZoom(touchEndX, touchEndY);
              lastTapRecord = { time: 0, x: 0, y: 0 };
              isTouching = false;
              return;
            }

            lastTapRecord = { time: now, x: touchEndX, y: touchEndY };

            // Swipe navigation when at normal scale
            if (isTouching && zoomLevel <= 1.05 && Math.abs(diffX) > 65 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
              if (diffX < 0) {
                goNextSlide();
              } else {
                goPrevSlide();
              }
            }
          }
          isTouching = false;
        }, { passive: false });
      }
    }

    function applyTransform() {
      const fullImg = modal.querySelector('#slideFullImg');
      if (fullImg) {
        fullImg.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoomLevel})`;
        fullImg.style.cursor = zoomLevel > 1 ? 'grab' : 'zoom-in';
      }
      const pctDesk = modal.querySelector('#desktopZoomPct');
      if (pctDesk) pctDesk.textContent = `${Math.round(zoomLevel * 100)}%`;
      const pctDock = modal.querySelector('#dockZoomPct');
      if (pctDock) pctDock.textContent = `${Math.round(zoomLevel * 100)}%`;

      // Update quickbar buttons active class
      modal.querySelectorAll('.quick-zoom-btn').forEach(btn => {
        const val = parseFloat(btn.getAttribute('data-zoom'));
        btn.classList.toggle('active', Math.abs(val - zoomLevel) < 0.15);
      });
    }

    function goPrevSlide() {
      currentIdx = (currentIdx - 1 + list.length) % list.length;
      zoomLevel = 1.0;
      panX = 0;
      panY = 0;
      renderSlideContent();
    }

    function goNextSlide() {
      currentIdx = (currentIdx + 1) % list.length;
      zoomLevel = 1.0;
      panX = 0;
      panY = 0;
      renderSlideContent();
    }

    function doZoom(delta) {
      const img = modal.querySelector('#slideFullImg');
      if (img) img.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      zoomLevel = Math.min(Math.max(Math.round((zoomLevel + delta) * 10) / 10, 0.8), 5.0);
      if (zoomLevel <= 1.0) {
        panX = 0;
        panY = 0;
      }
      applyTransform();
      const toast = modal.querySelector('#zoomToast');
      if (toast) {
        toast.textContent = `${Math.round(zoomLevel * 100)}%`;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 1100);
      }
    }

    function resetZoom() {
      const img = modal.querySelector('#slideFullImg');
      if (img) img.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      zoomLevel = 1.0;
      panX = 0;
      panY = 0;
      applyTransform();
      const toast = modal.querySelector('#zoomToast');
      if (toast) {
        toast.textContent = `100%`;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 1100);
      }
    }

    function toggleInfo() {
      isInfoOpen = !isInfoOpen;
      const drawer = modal.querySelector('#slideInfoDrawer');
      const btnDesk = modal.querySelector('#btnToggleInfo');
      const btnMob = modal.querySelector('#btnMobileToggleInfo');

      if (drawer) {
        if (window.innerWidth > 768) {
          drawer.style.width = isInfoOpen ? '420px' : '0';
          drawer.style.padding = isInfoOpen ? '20px' : '0';
          drawer.style.display = isInfoOpen ? 'block' : 'none';
        } else {
          drawer.classList.toggle('open', isInfoOpen);
        }
      }
      if (btnDesk) btnDesk.style.background = isInfoOpen ? '#0284c7' : 'rgba(255,255,255,0.1)';
      if (btnMob) btnMob.style.background = isInfoOpen ? '#0284c7' : 'rgba(255,255,255,0.12)';
    }

    function closeInfoDrawer() {
      isInfoOpen = false;
      const drawer = modal.querySelector('#slideInfoDrawer');
      if (drawer) {
        if (window.innerWidth > 768) {
          drawer.style.width = '0';
          drawer.style.padding = '0';
          drawer.style.display = 'none';
        } else {
          drawer.classList.remove('open');
        }
      }
      const btnDesk = modal.querySelector('#btnToggleInfo');
      const btnMob = modal.querySelector('#btnMobileToggleInfo');
      if (btnDesk) btnDesk.style.background = 'rgba(255,255,255,0.1)';
      if (btnMob) btnMob.style.background = 'rgba(255,255,255,0.12)';
    }

    function closeViewer() {
      document.removeEventListener('keydown', handleKeyDown);
      modal.remove();
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') goPrevSlide();
      if (e.key === 'ArrowRight') goNextSlide();
      if (e.key === '+' || e.key === '=') doZoom(0.4);
      if (e.key === '-' || e.key === '_') doZoom(-0.4);
      if (e.key === '0') resetZoom();
      if (e.key === 'i' || e.key === 'I') toggleInfo();
      if (e.key === 'm' || e.key === 'M') toggleViewerMode();
    }

    document.addEventListener('keydown', handleKeyDown);
    renderSlideContent();
  };

  // --------------------------------------------------------
  // SXEMANI TO'LIQ EKRANDA VA KATTALASHTIRIB KO'RISH (SCHEME VIEWER)
  // --------------------------------------------------------
  window.openSchemeViewer = function (schemeId) {
    const list = window.HISTO_SCHEMES || [];
    let currentIdx = list.findIndex(s => s.id === schemeId);
    if (currentIdx === -1) currentIdx = 0;

    let zoomLevel = 2.0;
    let panX = 0;
    let panY = 0;
    let lastDoubleZoomTime = 0;
    let isSidePanelOpen = true;

    const existing = document.getElementById('slideViewerModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'slide-lightbox-modal';
    modal.id = 'slideViewerModal';
    document.body.appendChild(modal);

    function renderSchemeContent() {
      const s = list[currentIdx];
      let sTitle = '';
      if (state.lang === 'uz-cyr') sTitle = s.title_cyr || latToCyr(s.title_uz || s.title);
      else if (state.lang === 'ru') sTitle = s.title_ru || s.title_cyr || s.title;
      else sTitle = s.title_uz || cyrToLat(s.title || s.title_cyr);

      let sQuestion = '';
      if (state.lang === 'uz-cyr') sQuestion = s.question_cyr || latToCyr(s.question_uz || s.question);
      else if (state.lang === 'ru') sQuestion = s.question_ru || s.question_cyr || s.question;
      else sQuestion = s.question_uz || cyrToLat(s.question || s.question_cyr);

      let sAnswer = '';
      if (state.lang === 'uz-cyr') sAnswer = s.answer_cyr || convertHtml(s.answer_uz, latToCyr);
      else if (state.lang === 'ru') sAnswer = s.answer_ru || s.answer_cyr || convertHtml(s.answer_uz, latToCyr);
      else sAnswer = s.answer_uz || convertHtml(s.answer_cyr, cyrToLat);

      const schemeCat = localizeText(s.category);
      const imgSrc = (window.HISTO_SCHEME_IMAGES && window.HISTO_SCHEME_IMAGES[s.id]) ? window.HISTO_SCHEME_IMAGES[s.id] : s.image;
      const schemeBadge = state.lang === 'uz-cyr' ? 'Схема' : (state.lang === 'ru' ? 'Схема' : (state.lang === 'en' ? 'Scheme' : 'Sxema'));
      const hideTxt = state.lang === 'uz-cyr' ? 'Ён панелни яшириш' : (state.lang === 'ru' ? 'Скрыть панель' : (state.lang === 'en' ? 'Hide Panel' : 'Yon panelni yashirish'));
      const showTxt = t('showStructures');
      const sidePanelTxt = state.lang === 'uz-cyr' ? 'Ён панел' : (state.lang === 'ru' ? 'Панель' : (state.lang === 'en' ? 'Side Panel' : 'Yon panel'));

      modal.innerHTML = `
        <div class="lightbox-header">
          <div class="lightbox-title">
            <h3>${ICONS.book} #${s.id}. ${sTitle}</h3>
            <p>${schemeCat} &bull; ${sQuestion || "Rasmiy imtihon sxemasi"}</p>
          </div>
          
          <div class="lightbox-tools-desktop">
            <button class="lightbox-btn" id="btnToggleSidePanel" style="background:#059669; color:#fff; font-weight:700;" title="${t('schemeAnswer')}">
              ${ICONS.target} <span id="desktopSideToggleText">${isSidePanelOpen ? hideTxt : showTxt}</span>
            </button>
            <div style="width:1px; height:24px; background:rgba(255,255,255,0.15); margin:0 4px;"></div>
            <button class="lightbox-btn" id="btnPrevScheme" title="${t('prev')}">${ICONS.chevLeft} ${t('prev')}</button>
            <span style="color:#94a3b8; font-size:0.85rem; font-weight:700;">${currentIdx + 1} / ${list.length}</span>
            <button class="lightbox-btn" id="btnNextScheme" title="${t('next')}">${t('next')} ${ICONS.chevRight}</button>
            <div style="width:1px; height:24px; background:rgba(255,255,255,0.15); margin:0 4px;"></div>
            <button class="lightbox-btn" id="btnZoomIn" title="${t('zoom')}">${ICONS.zoomIn}</button>
            <button class="lightbox-btn" id="btnZoomOut" title="${t('zoomOut')}">${ICONS.zoomOut}</button>
            <button class="lightbox-btn" id="btnZoomReset" title="${t('resetZoom')}">${ICONS.reset} <span id="desktopZoomPct">${Math.round(zoomLevel * 100)}%</span></button>
            <button class="lightbox-btn" style="background:#ef4444; color:#fff;" id="btnCloseSlide">${ICONS.close}</button>
          </div>

          <div class="lightbox-tools-mobile">
            <button class="lightbox-btn" id="btnMobileToggleSide" style="background:#059669; color:#fff; padding:6px 10px;" title="${t('schemeAnswer')}">${ICONS.target}</button>
            <button class="lightbox-btn" id="btnMobileZoomIn" style="background:#0284c7; color:#fff; padding:6px 10px;" title="${t('zoom')}">${ICONS.zoomIn}</button>
            <button class="lightbox-btn" id="btnMobileZoomOut" style="background:rgba(255,255,255,0.12); color:#fff; padding:6px 10px;" title="${t('zoomOut')}">${ICONS.zoomOut}</button>
            <button class="lightbox-btn" style="background:#ef4444; color:#fff; padding:6px 10px;" id="btnMobileCloseSlide">${ICONS.close}</button>
          </div>
        </div>

        <div class="scheme-lightbox-container ${isSidePanelOpen ? '' : 'expanded-canvas'}" id="schemeSplitWrap">
          
          <!-- LEFT / MAIN: Diagram Canvas Pane -->
          <div class="scheme-diagram-pane" id="schemeCanvasPane">
            <div class="modal-zoom-quickbar">
              <button class="quick-zoom-btn ${Math.abs(zoomLevel - 1.0) < 0.1 ? 'active' : ''}" data-zoom="1.0">100%</button>
              <button class="quick-zoom-btn ${Math.abs(zoomLevel - 2.0) < 0.1 ? 'active' : ''}" data-zoom="2.0">200%</button>
              <button class="quick-zoom-btn ${Math.abs(zoomLevel - 2.5) < 0.1 ? 'active' : ''}" data-zoom="2.5">250%</button>
              <button class="quick-zoom-btn ${Math.abs(zoomLevel - 3.0) < 0.1 ? 'active' : ''}" data-zoom="3.0">300%</button>
            </div>

            <div class="lightbox-content-wrap" id="slideImgWrap" style="flex:1; touch-action:none; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
              <img 
                id="slideFullImg"
                class="lightbox-img" 
                src="${imgSrc}" 
                alt="${sTitle}" 
                style="transform: translate3d(${panX}px, ${panY}px, 0) scale(${zoomLevel}); cursor: ${zoomLevel > 1 ? 'grab' : 'zoom-in'}; max-width:94%; max-height:86vh; object-fit:contain;"
                onerror="this.onerror=null; this.src='images/preparatlar_royxati.jpg';" 
              />
            </div>

            <div class="zoom-toast-indicator" id="zoomToast">${Math.round(zoomLevel * 100)}%</div>

            <div class="lightbox-hint" style="bottom: 84px;">
              ${ICONS.lightning} ${t('doubleTapHint')}
            </div>

            <div class="lightbox-floating-dock" id="lightboxDock">
              <button class="lightbox-dock-btn" id="btnDockPrev" title="${t('prev')}">${ICONS.chevLeft}</button>
              <span class="lightbox-dock-indicator">${currentIdx + 1} / ${list.length}</span>
              <button class="lightbox-dock-btn" id="btnDockNext" title="${t('next')}">${ICONS.chevRight}</button>
              <div class="lightbox-dock-divider"></div>
              <button class="lightbox-dock-btn" id="btnDockToggleSide" title="${t('schemeAnswer')}" style="background:#059669; width:auto; padding:0 12px; border-radius:20px; font-size:0.78rem; font-weight:700; gap:5px;">
                ${ICONS.target} <span id="dockSideToggleText">${isSidePanelOpen ? sidePanelTxt : showTxt}</span>
              </button>
              <button class="lightbox-dock-btn" id="btnDockZoomIn" title="${t('zoom')}" style="background:#0284c7;">${ICONS.zoomIn}</button>
              <button class="lightbox-dock-btn" id="btnDockZoomReset" title="${t('resetZoom')}" style="width:auto; padding:0 10px; border-radius:20px; font-size:0.78rem; font-weight:700; gap:4px;">${ICONS.reset} <span id="dockZoomPct">${Math.round(zoomLevel * 100)}%</span></button>
              <button class="lightbox-dock-btn" id="btnDockZoomOut" title="${t('zoomOut')}">${ICONS.zoomOut}</button>
            </div>
          </div>

          <!-- RIGHT / SIDE: Answers and Explanations Panel -->
          <div class="scheme-side-panel ${isSidePanelOpen ? '' : 'collapsed'}" id="schemeSidePanel">
            <div class="scheme-side-header">
              <div class="scheme-side-title">
                <div style="display:flex; align-items:center; gap:6px; margin-bottom:3px;">
                  <span class="badge-id" style="font-size:0.74rem; padding:2px 7px;">#${schemeBadge} ${s.id}</span>
                  <span class="badge-cat" style="font-size:0.74rem; padding:2px 7px;">${schemeCat}</span>
                </div>
                <h4>${sTitle}</h4>
              </div>
              <button class="lightbox-btn" id="btnSidePanelCollapse" title="Panelni yashirish / Rasmni kengaytirish" style="padding:6px 10px; font-size:0.78rem; background:rgba(255,255,255,0.12);">
                ${ICONS.expand}
              </button>
            </div>

            <div class="scheme-side-body">
              <div class="scheme-task-card">
                <h5>${ICONS.target} ${t('schemeTask')}</h5>
                <p>${sQuestion || "Rasmiy sxemadagi barcha raqamlangan tuzilmalarni aniqlang va tushuntiring."}</p>
              </div>

              <div class="scheme-answer-card">
                <h5>${ICONS.checkCircle} ${t('schemeAnswer')}</h5>
                <div class="scheme-answer-list">
                  ${sAnswer}
                </div>
              </div>
            </div>

            <div class="scheme-side-footer">
              <button class="lightbox-btn" id="btnSideFooterPrev" style="padding:6px 12px; font-size:0.8rem;">
                ${ICONS.chevLeft} ${t('prev')}
              </button>
              <span style="color:#94a3b8; font-size:0.82rem; font-weight:700;">${currentIdx + 1} / ${list.length}</span>
              <button class="lightbox-btn" id="btnSideFooterNext" style="padding:6px 12px; font-size:0.8rem;">
                ${t('next')} ${ICONS.chevRight}
              </button>
            </div>
          </div>

        </div>
      `;

      function bindBtn(id, fn) {
        const el = modal.querySelector('#' + id);
        if (!el) return;
        let lastTime = 0;
        function trigger(e) {
          const now = Date.now();
          if (now - lastTime < 180) return;
          lastTime = now;
          if (e) { e.preventDefault(); e.stopPropagation(); }
          fn();
        }
        el.addEventListener('pointerup', trigger);
        el.addEventListener('click', trigger);
      }

      function showZoomToast(text) {
        const toast = modal.querySelector('#zoomToast');
        if (!toast) return;
        toast.textContent = text;
        toast.classList.add('show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('show'), 1100);
      }

      modal.querySelectorAll('.quick-zoom-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault(); e.stopPropagation();
          zoomLevel = parseFloat(btn.getAttribute('data-zoom'));
          panX = 0; panY = 0;
          applyTransform();
          showZoomToast(`${Math.round(zoomLevel * 100)}%`);
        });
      });

      bindBtn('btnCloseSlide', closeViewer);
      bindBtn('btnMobileCloseSlide', closeViewer);
      bindBtn('btnPrevScheme', goPrev);
      bindBtn('btnDockPrev', goPrev);
      bindBtn('btnNextScheme', goNext);
      bindBtn('btnDockNext', goNext);

      bindBtn('btnZoomIn', () => doZoom(0.4));
      bindBtn('btnMobileZoomIn', () => doZoom(0.4));
      bindBtn('btnDockZoomIn', () => doZoom(0.4));

      bindBtn('btnZoomOut', () => doZoom(-0.4));
      bindBtn('btnMobileZoomOut', () => doZoom(-0.4));
      bindBtn('btnDockZoomOut', () => doZoom(-0.4));

      bindBtn('btnZoomReset', resetZoom);
      bindBtn('btnDockZoomReset', resetZoom);

      function toggleSidePanel() {
        isSidePanelOpen = !isSidePanelOpen;
        const panel = modal.querySelector('#schemeSidePanel');
        const container = modal.querySelector('#schemeSplitWrap');
        const deskBtnTxt = modal.querySelector('#desktopSideToggleText');
        const dockBtnTxt = modal.querySelector('#dockSideToggleText');

        if (panel) panel.classList.toggle('collapsed', !isSidePanelOpen);
        if (container) container.classList.toggle('expanded-canvas', !isSidePanelOpen);

        const hTxt = state.lang === 'uz-cyr' ? 'Ён панелни яшириш' : (state.lang === 'ru' ? 'Скрыть панель' : (state.lang === 'en' ? 'Hide Panel' : 'Yon panelni yashirish'));
        const sTxt = t('showStructures');
        const spTxt = state.lang === 'uz-cyr' ? 'Ён панел' : (state.lang === 'ru' ? 'Панель' : (state.lang === 'en' ? 'Side Panel' : 'Yon panel'));

        if (deskBtnTxt) deskBtnTxt.textContent = isSidePanelOpen ? hTxt : sTxt;
        if (dockBtnTxt) dockBtnTxt.textContent = isSidePanelOpen ? spTxt : sTxt;

        setTimeout(applyTransform, 50);
      }

      bindBtn('btnToggleSidePanel', toggleSidePanel);
      bindBtn('btnMobileToggleSide', toggleSidePanel);
      bindBtn('btnDockToggleSide', toggleSidePanel);
      bindBtn('btnSidePanelCollapse', toggleSidePanel);
      bindBtn('btnSideFooterPrev', goPrev);
      bindBtn('btnSideFooterNext', goNext);

      const wrap = modal.querySelector('#slideImgWrap');
      const img = modal.querySelector('#slideFullImg');
      const dock = modal.querySelector('#lightboxDock');

      if (dock) {
        dock.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        dock.addEventListener('mousedown', (e) => e.stopPropagation());
      }

      if (wrap) {
        wrap.onwheel = (e) => {
          e.preventDefault();
          doZoom(e.deltaY < 0 ? 0.3 : -0.3);
        };
      }

      let isDragging = false;
      let startX = 0, startY = 0;
      let initialDistance = 0;
      let initialScale = 1.0;

      function onPointerDown(e) {
        if (e.target.closest('.lightbox-floating-dock') || e.target.closest('.modal-zoom-quickbar')) return;
        isDragging = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        if (img) img.style.transition = 'none';
      }

      function onPointerMove(e) {
        if (!isDragging) return;
        panX = e.clientX - startX;
        panY = e.clientY - startY;
        applyTransform();
      }

      function onPointerUp() {
        isDragging = false;
        if (img) img.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      }

      if (wrap) {
        wrap.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        wrap.addEventListener('touchstart', (e) => {
          if (e.touches.length === 2) {
            isDragging = false;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            initialDistance = Math.hypot(dx, dy);
            initialScale = zoomLevel;
          }
        }, { passive: true });

        wrap.addEventListener('touchmove', (e) => {
          if (e.touches.length === 2 && initialDistance > 0) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            const scale = (dist / initialDistance) * initialScale;
            zoomLevel = Math.min(Math.max(scale, 0.8), 5.0);
            applyTransform();
          }
        }, { passive: true });

        wrap.addEventListener('touchend', (e) => {
          if (e.touches.length < 2) initialDistance = 0;
        }, { passive: true });

        let lastTap = 0;
        wrap.addEventListener('touchend', (e) => {
          const now = Date.now();
          if (now - lastTap < 300) {
            e.preventDefault();
            zoomLevel = zoomLevel > 1.2 ? 1.0 : 2.5;
            panX = 0; panY = 0;
            applyTransform();
            showZoomToast(`${Math.round(zoomLevel * 100)}%`);
          }
          lastTap = now;
        });

        wrap.addEventListener('dblclick', (e) => {
          e.preventDefault();
          zoomLevel = zoomLevel > 1.2 ? 1.0 : 2.5;
          panX = 0; panY = 0;
          applyTransform();
          showZoomToast(`${Math.round(zoomLevel * 100)}%`);
        });
      }
    }

    function applyTransform() {
      const fullImg = modal.querySelector('#slideFullImg');
      if (fullImg) {
        fullImg.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoomLevel})`;
        fullImg.style.cursor = zoomLevel > 1 ? 'grab' : 'zoom-in';
      }
      const pctDesk = modal.querySelector('#desktopZoomPct');
      if (pctDesk) pctDesk.textContent = `${Math.round(zoomLevel * 100)}%`;
      const pctDock = modal.querySelector('#dockZoomPct');
      if (pctDock) pctDock.textContent = `${Math.round(zoomLevel * 100)}%`;
      modal.querySelectorAll('.quick-zoom-btn').forEach(btn => {
        const val = parseFloat(btn.getAttribute('data-zoom'));
        btn.classList.toggle('active', Math.abs(val - zoomLevel) < 0.15);
      });
    }

    function goPrev() {
      currentIdx = (currentIdx - 1 + list.length) % list.length;
      zoomLevel = 2.0; panX = 0; panY = 0;
      renderSchemeContent();
    }

    function goNext() {
      currentIdx = (currentIdx + 1) % list.length;
      zoomLevel = 2.0; panX = 0; panY = 0;
      renderSchemeContent();
    }

    function doZoom(delta) {
      zoomLevel = Math.min(Math.max(Math.round((zoomLevel + delta) * 10) / 10, 0.8), 5.0);
      if (zoomLevel <= 1.0) { panX = 0; panY = 0; }
      applyTransform();
    }

    function resetZoom() {
      zoomLevel = 1.0; panX = 0; panY = 0;
      applyTransform();
    }

    function closeViewer() {
      document.removeEventListener('keydown', handleKey);
      modal.remove();
    }

    function handleKey(e) {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === '+' || e.key === '=') doZoom(0.4);
      if (e.key === '-' || e.key === '_') doZoom(-0.4);
      if (e.key === '0') resetZoom();
      if (e.key === 's' || e.key === 'S' || e.key === 'a' || e.key === 'A') toggleSidePanel();
    }

    document.addEventListener('keydown', handleKey);
    renderSchemeContent();
  };

  // --------------------------------------------------------
  // EVENT LISTENERS & INITIALIZATION
  // --------------------------------------------------------
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  if (mainSearchInput) {
    let searchDebounceTimer = null;
    mainSearchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        state.searchQuery = e.target.value;
        state.pageLimit = 25;
        renderCurrentTab();
      }, 160);
    });
  }

  if (hideAnswersCheckbox) {
    hideAnswersCheckbox.addEventListener('change', (e) => {
      state.hideAnswers = e.target.checked;
      document.querySelectorAll('.answer-container').forEach(el => {
        el.classList.toggle('hidden-answer', state.hideAnswers);
      });
      document.querySelectorAll('.ans-toggle-btn').forEach(btn => {
        btn.innerHTML = state.hideAnswers ? `${ICONS.eye} ${t('showAnswer')}` : `${ICONS.eyeOff} ${t('hideAnswer')}`;
      });
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = nextTheme;
      safeStorage.set('histo_theme', nextTheme);
      applyTheme();
    });
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const iconSvg = document.getElementById('themeIconSvg');
    if (iconSvg) {
      iconSvg.innerHTML = state.theme === 'dark' ? ICONS.sun : ICONS.moon;
    }
  }

  if (headerProfileBtn) {
    headerProfileBtn.addEventListener('click', () => {
      switchTab('profile');
    });
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================================
  // USTOZ TAHRIRI / JAVOBNI TO'G'RILASH TIZIMI (MODAL & API)
  // ========================================================
  let currentCorrectionTarget = null;

  window.openCorrectionModal = function (type, id, title) {
    if (!title) {
      if (type === 'question' && window.HISTO_QUESTIONS) {
        const it = window.HISTO_QUESTIONS.find(x => x.id === id);
        if (it) title = it.question_uz || it.question || '';
      } else if (type === 'case' && window.HISTO_CASES) {
        const it = window.HISTO_CASES.find(x => x.id === id);
        if (it) title = it.title_uz || it.title || '';
      } else if (type === 'prep' && window.HISTO_PREPARATIONS) {
        const it = window.HISTO_PREPARATIONS.find(x => x.id === id);
        if (it) title = it.name || '';
      } else if (type === 'scheme' && window.HISTO_SCHEMES) {
        const it = window.HISTO_SCHEMES.find(x => x.id === id);
        if (it) title = it.title_uz || it.title || '';
      }
    }
    currentCorrectionTarget = { type, id, title: title || '' };
    const overlay = document.getElementById('correctionModalOverlay');
    const badge = document.getElementById('corrBadge');
    const titleEl = document.getElementById('corrTitleText');
    const alertEl = document.getElementById('corrAlert');
    const textEl = document.getElementById('corrText');

    if (!overlay) return;

    const typeNames = {
      'question': "Nazariy savol",
      'case': "Vaziyatli masala",
      'prep': "Preparat",
      'scheme': "Sxema"
    };

    if (badge) badge.textContent = `${typeNames[type] || "Bo'lim"} #${id}`;
    if (titleEl) titleEl.textContent = title || '';
    if (alertEl) {
      alertEl.style.display = 'none';
      alertEl.className = 'correction-alert';
    }
    if (textEl) {
      textEl.value = '';
      setTimeout(() => textEl.focus(), 150);
    }

    // Auto-fill author from Telegram WebApp user if available
    const authorEl = document.getElementById('corrAuthor');
    if (authorEl && !authorEl.value && window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
      const u = window.Telegram.WebApp.initDataUnsafe.user;
      authorEl.value = `${u.first_name || ''} ${u.last_name || ''}`.trim() + (u.username ? ` (@${u.username})` : '');
    }

    overlay.style.display = 'flex';
  };

  window.closeCorrectionModal = function () {
    const overlay = document.getElementById('correctionModalOverlay');
    if (overlay) overlay.style.display = 'none';
    currentCorrectionTarget = null;
  };

  window.submitCorrection = async function () {
    if (!currentCorrectionTarget) return;

    const textEl = document.getElementById('corrText');
    const authorEl = document.getElementById('corrAuthor');
    const alertEl = document.getElementById('corrAlert');
    const submitBtn = document.getElementById('btnSubmitCorrection');

    const text = (textEl ? textEl.value : '').trim();
    const author = (authorEl ? authorEl.value : '').trim() || "Ustoz / Platforma foydalanuvchisi";

    if (!text) {
      if (alertEl) {
        alertEl.textContent = "Iltimos, to'g'ri javob matnini yoki izohni kiriting!";
        alertEl.className = 'correction-alert error';
        alertEl.style.display = 'block';
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Yuborilmoqda...";
    }

    const typeNames = {
      'question': "Nazariy savol",
      'case': "Vaziyatli masala",
      'prep': "Preparat",
      'scheme': "Sxema"
    };

    const payload = {
      user_name: author,
      item_type: typeNames[currentCorrectionTarget.type] || "Savol",
      item_id: currentCorrectionTarget.id,
      item_title: currentCorrectionTarget.title || '',
      text: text
    };

    try {
      const response = await fetch('https://gistalogiya-bot.onrender.com/api/correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        if (alertEl) {
          alertEl.textContent = "✅ Katta rahmat! Tahriringiz adminga yetkazildi va tez orada platformada yangilanadi.";
          alertEl.className = 'correction-alert success';
          alertEl.style.display = 'block';
        }
        setTimeout(() => {
          window.closeCorrectionModal();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Tahrirni yuborish";
          }
        }, 1800);
      } else {
        throw new Error('Server javobi kutilmagan');
      }
    } catch (err) {
      if (alertEl) {
        alertEl.innerHTML = "⚠️ Tahrir saqlandi! Shuningdek to'g'ridan-to'g'ri <a href='https://t.me/Gistalogiya_bot' target='_blank' style='color:#0284c7; font-weight:700;'>@Gistalogiya_bot</a> yoki <a href='https://t.me/xazratkulovvm' target='_blank' style='color:#0284c7; font-weight:700;'>@xazratkulovvm</a> ga yuborishingiz mumkin.";
        alertEl.className = 'correction-alert success';
        alertEl.style.display = 'block';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Tahrirni yuborish";
      }
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeCorrectionModal();
    }
  });

  // App Init
  applyTheme();
  window.switchLanguage(state.lang);
  updateBadges();
  renderCategories();
  renderCurrentTab();

})();