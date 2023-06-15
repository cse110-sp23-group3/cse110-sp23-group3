/**
 * Function that toggles the state of the mobile sidebar menu when the sidebar's toggle button is clicked.
 * When a click event occurs outside of the sidebar or the menu toggle, the sidebar is closed.
 * This function should be run after the DOM is loaded.
 * @function
 * @returns {void} This function does not return a value.
 */
function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  const menuToggle = document.querySelector('.sidebar__toggle');

  menuToggle.addEventListener('click', () => {
    console.log('click');
    sidebar.classList.toggle('sidebar--open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInside = menuToggle.contains(event.target);
    const isClickInsideMenu = sidebar.contains(event.target);

    if (!isClickInside && !isClickInsideMenu) {
      sidebar.classList.remove('sidebar--open');
    }
  });
}

/**
 * Adds an event listener to the document to ensure that the `toggleMenu` function is called
 * after the Document Object Model (DOM) has fully loaded.
 * @function
 * @returns {void} This function does not return a value.
 */
document.addEventListener('DOMContentLoaded', () => {
  toggleMenu();
});
