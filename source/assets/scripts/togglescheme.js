/**
 * A constant that defines the 'data-theme' attribute.
 * @constant
 * @type {string}
 */
const DATA_THEME = 'data-theme';

/**
 * Function that detects the user's preferred color scheme (dark or light)
 * and applies it as the theme to the document element. It also updates the state of
 * the color scheme toggle button accordingly.
 * @function
 * @returns {void}
 * @see {@link https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/}
 */
function detectScheme() {
  const scheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  // change the toggle button
  const toggle = document.querySelector('#scheme-toggle');
  toggle.checked = scheme === 'dark';

  document.documentElement.setAttribute(DATA_THEME, scheme);
}

/**
 * Function that toggles the color scheme between dark and light when the color scheme
 * toggle button is clicked. The selected scheme is then set as the 'data-theme' attribute
 * of the document element and stored in the browser's local storage.
 * @function
 * @returns {void}
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

/**
 * Adds an event listener to the document to ensure that the `detectScheme` and `toggleScheme`
 * functions are called after the Document Object Model (DOM) has fully loaded.
 * @function
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', () => {
  detectScheme();
  toggleScheme();
});
