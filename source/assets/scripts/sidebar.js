/**
 * Toggle the mobile sidebar menu
 */
const toggleMenu = () => {
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
};

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  toggleMenu();
});
