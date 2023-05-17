export function navbar(toggler, collapse) {
  const navToggle = document.querySelector(toggler);
  const navCollapse = document.querySelector(collapse);

  navToggle.onclick = e => {
    if (navCollapse.classList.contains('is-active')) {
      navCollapse.classList.remove('is-active');
    } else {
      navCollapse.classList.add('is-active');
    }
  }
}