const DATA_THEME = 'data-theme';

/**
 * Detect the user's preferred color scheme
 * and set the theme accordingly
 * @see https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
 */
function detectScheme() {
  const scheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  document.documentElement.setAttribute(DATA_THEME, scheme);
}

/**
 * Toggle the color scheme
 */
function toggleScheme() {
  const toggle = document.querySelector('#scheme-toggle');

  toggle.addEventListener('click', () => {
    const scheme =
      document.documentElement.getAttribute(DATA_THEME) === 'dark'
        ? 'light'
        : 'dark';
    document.documentElement.setAttribute(DATA_THEME, scheme);
    localStorage.setItem('scheme', scheme);
  });
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  detectScheme();
  toggleScheme();
});
