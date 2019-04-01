const smooth = window.smoothscroll;

const menuItems = document.querySelectorAll('#main-menu a');
menuItems.forEach(el =>
  el.addEventListener.click(e => {
    e.preventDefault();
    const scrollTargetEl = document.querySelector(e.currentTarget.href);

    smoothscroll(scrollTargetEl);
  })
);
