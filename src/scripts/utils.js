import scrollSpy from './scrollspy';
import autoType from './autotype';

// on document ready
document.addEventListener('DOMContentLoaded', function () {

  //on window scroll
  window.onscroll = function () {
    // window is greater than 561px
    if (typeof document.documentElement != 'undefined' &&
      typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth > 561) {

      let topHeader = document.querySelector('header');
      let topHeaderHeight = topHeader.offsetHeight;
      let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
      // if scroll position is greater than header height add sticky class   
      if (scrollPosition > topHeaderHeight) {
        topHeader.classList.add("sticky");
      } else {
        topHeader.classList.remove("sticky");
      }
    }
  };

  // on window resize
  window.onresize = function () {
    // window is less than 561px, add click listeners to anchors
    if (typeof document.documentElement != 'undefined' &&
      typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth < 561) {
      var item_list = document.querySelector('.nav-container').getElementsByTagName('a');
      for (var i = 0; i < item_list.length; i++) {
        item_list[i].addEventListener('click', function () {
          document.getElementById('menu-nav').checked = false;
          // remove sticky class
          document.querySelector('.nav-container').classList.remove("sticky");
        }, false);
      }
    }
  };

  // add click listeners to anchors
  document.getElementById('menu-nav').addEventListener('click', function () {

    if (document.getElementById('menu-nav').checked) {
      document.querySelector('.nav-container').classList.add("sticky");
    } else {
      document.querySelector('.nav-container').classList.remove("sticky");
    }
  }, false);

  const menu = document.querySelector('nav');
  scrollSpy(menu, 875);

  var id = 'type_text';

  autoType(id, 2000, 170);

});
