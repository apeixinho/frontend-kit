import scrollSpy from './scrollspy';

// on document ready
document.addEventListener('DOMContentLoaded', function () {

  //on window scroll
  window.onscroll = function () {

    // add sticky class only when window is greater than 561px
    if (typeof document.documentElement != 'undefined' &&
      typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth > 561) {

      let topHeader = document.querySelector('header');
      let topHeaderHeight = topHeader.offsetHeight;
      let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollPosition > topHeaderHeight) {
        topHeader.classList.add("sticky");
      } else {
        topHeader.classList.remove("sticky");
      }
    }
  };
  // on window resize
  window.onresize = function () {
    // add click listener only when window is less than 561px
    if (typeof document.documentElement != 'undefined' &&
      typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth < 561) {
      var item_list = document.querySelector('.nav-container').getElementsByTagName('a');
      for (var i = 0; i < item_list.length; i++) {
        item_list[i].addEventListener('click', function () {
          document.getElementById('menu-nav').checked = false;
        }, false);
      }
    }
  };

  document.getElementById('menu-nav').addEventListener('click', function () {

    if (document.getElementById('menu-nav').checked) {
      document.querySelector('.nav-container').classList.add("sticky");
    } else {
      document.querySelector('.nav-container').classList.remove("sticky");
    }
  }, false);

  const menu = document.querySelector('nav');
  scrollSpy(menu, 875);
});
