const langButtons = document.querySelectorAll('.lang-btn');
const pageTitle = document.getElementById('page-title');
const pageHeading = document.getElementById('page-heading');
const pageContent = document.getElementById('page-content');
const navHome = document.getElementById('nav-home');
const navCatalog = document.getElementById('nav-catalog');
const navAbout = document.getElementById('nav-about');
const navContact = document.getElementById('nav-contact');

async function loadTranslations(lang) {
  const response = await fetch(`translations/${lang}.json`);
  const translations = await response.json();
  return translations;
}

async function updateContent(lang) {
  const translations = await loadTranslations(lang);
  const path = window.location.pathname.split('/').pop().replace('.html', '');
  const pageKey = path === '' ? 'index' : path;

  // Обновление навигации
  navHome.textContent = translations.navigation.home;
  navCatalog.textContent = translations.navigation.catalog;
  navAbout.textContent = translations.navigation.about;
  navContact.textContent = translations.navigation.contact;

  // Обновление контента страницы
  pageTitle.textContent = translations[pageKey].title;
  pageHeading.textContent = translations[pageKey].heading;
  pageContent.textContent = translations[pageKey].content;
  
  // Обновление специфичного для главной страницы контента
  if (pageKey === 'index') {
    const h2 = document.querySelector('h2');
    if (h2) h2.textContent = translations[pageKey].about_heading;
    const lastP = document.querySelector('p:last-of-type');
    if (lastP) lastP.textContent = translations[pageKey].about_text;
  }
  
  // Добавление класса 'active' к текущей кнопке
  langButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
}

langButtons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    const selectedLang = event.target.dataset.lang;
    localStorage.setItem('lang', selectedLang);
    updateContent(selectedLang);
  });
});

window.addEventListener('load', () => {
  const savedLang = localStorage.getItem('lang') || 'ru';
  updateContent(savedLang);
});

