const darkModeToggle = document.getElementById('dark-mode-toggle');
const root = document.documentElement;

darkModeToggle.addEventListener('click', () => {
  let themeToSet = root.style.getPropertyValue('color-scheme') === 'light' ? 'dark' : 'light'; 
  root.style.setProperty('color-scheme', themeToSet);
});