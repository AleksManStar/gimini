const languageSelect = document.getElementById('language-select');

async function loadTranslations(lang) {
  const response = await fetch(`translations/${lang}.json`);
  const translations = await response.json();
  return translations;
}

async function updateContent(lang) {
  const translations = await loadTranslations(lang);
  const path = window.location.pathname.split('/').pop().replace('.html', '');
  const pageKey = path === '' ? 'index' : path;
  
  document.getElementById('page-title').textContent = translations[pageKey].title;
  document.getElementById('page-heading').textContent = translations[pageKey].heading;
  document.getElementById('page-content').textContent = translations[pageKey].content;
  
  document.getElementById('nav-home').textContent = translations.navigation.home;
  document.getElementById('nav-catalog').textContent = translations.navigation.catalog;
  document.getElementById('nav-about').textContent = translations.navigation.about;
  document.getElementById('nav-contact').textContent = translations.navigation.contact;
}

languageSelect.addEventListener('change', (event) => {
  const selectedLang = event.target.value;
  localStorage.setItem('lang', selectedLang);
  updateContent(selectedLang);
});

window.addEventListener('load', () => {
  const savedLang = localStorage.getItem('lang') || 'ru';
  languageSelect.value = savedLang;
  updateContent(savedLang);
});
