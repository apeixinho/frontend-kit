import VanillaScrollspy from 'vanillajs-scrollspy';
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

    if (typeof document.documentElement != 'undefined') {
      // is my face visible
      var my_face = document.getElementById('my_face');
      if (isVisibleOnScreen(my_face)) {
        document.getElementById('my_face')
        .classList
        .add("animated", "bounceIn", "slow");
      } else {
        my_face
        .classList
        .remove("animated", "bounceIn", "slow");
      }
      // about section is visible
      var about_section = document.getElementById('about');
      if (isVisibleOnScreen(about_section)) {
        // document.getElementsByClassName("user-data")[0]
        // .classList
        // .add("animated", "fadeIn", "delay-1s");
        var user_data_content_list =
        document.querySelector('.user-data-content').getElementsByTagName('li');
        for (var it = 0; it < user_data_content_list.length; it++) {
          user_data_content_list[it]
          .classList
          .add("animated", "fadeInRight", "delay-" + (it + 1) + "s");
        }
        document.getElementsByClassName("continuate")[0]
        .classList
        .add("animated","fadeIn","delay-5s","slower");
      }
      //  else {
        // document.getElementsByClassName("user-data")[0]
        // .classList
        // .remove("animated", "fadeIn", "delay-1s");
        // var user_data_content_list1 = document.querySelector('.user-data-content').getElementsByTagName('li');
        // for (var ite = 0; ite < user_data_content_list1.length; ite++) {
        //   user_data_content_list[ite]
        //   .classList
        //   .remove("animated", "fadeInRight", "delay-" + (ite + 1) + "s");
        // }
         // document.getElementsByClassName("continuate")[0]
        // .classList
        // .remove("animated", "fadeIn","delay-5s","slower");
      // }
    }
  };

  // on window resize
  window.onresize = function () {
    // window is less than 561px, add click listeners to anchors
    if (typeof document.documentElement != 'undefined' &&
      typeof document.documentElement.clientWidth !=
      'undefined' && document.documentElement.clientWidth < 561) {
      // add click listeners to anchors
      document.getElementById('menu-nav').addEventListener('click', function () {
        if (document.getElementById('menu-nav').checked) {
          document.querySelector('.nav-container').classList.add("sticky");
        } else {
          document.querySelector('.nav-container').classList.remove("sticky");
        }
      }, false);

      var item_list = document.querySelector('.nav-container').getElementsByTagName('a');
      for (var i = 0; i < item_list.length; i++) {
        item_list[i].addEventListener('click', function () {
          document.getElementById('menu-nav').checked = false;
          // remove sticky class
          document.querySelector('.nav-container').classList.remove("sticky");
        }, false);
      }

      var section_list = document.getElementsByTagName('section');
      for (var k = 0; k < section_list.length; k++) {
        section_list[k].addEventListener('click', function () {
          if (document.getElementById('menu-nav').checked) {
            document.getElementById('menu-nav').checked = false;
            document.querySelector('.nav-container').classList.remove("sticky");
          }
        }, false);
      }
    }
  };

  function isVisibleOnScreen(elem) {
    var rect = elem.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  const navbar = document.querySelector('nav');
  const scrollspy = new VanillaScrollspy(navbar, 875);
  scrollspy.init();

  var element_id = 'type_text';
  autoType(element_id, 2000, 170);

});
