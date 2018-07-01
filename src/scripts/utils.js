import scrollSpy from './scrollspy';

// on document ready
document.addEventListener('DOMContentLoaded', function () {

  //on window scroll
  window.onscroll = function () {

    let topHeader = document.querySelector('.main_header');
    let topHeaderHeight = topHeader.offsetHeight;
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition > topHeaderHeight) {
      topHeader.classList.add("sticky");
    } else {
      topHeader.classList.remove("sticky");
    }
  };
  // on window resize
  window.onresize = function () {
    // add click listener only when window is less than 561px
    if (typeof document.documentElement != 'undefined' &&
      typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth < 561) {
      let item_list = document.querySelector('.nav-container').getElementsByTagName('a');
      for (var i = 0; i < item_list.length; i++) {
        item_list[i].addEventListener('click', function () {
          document.getElementById('menu-nav').checked = false;
        }, false);
      }
    }
  };
  const menu = document.querySelector('.navbar');
  scrollSpy(menu, 875);
});
