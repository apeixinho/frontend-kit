import scrollSpy from './scrollspy';
import responsiveNav from 'responsive-nav';

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
  let menu = document.querySelector('.navbar');
  // eslint-disable-next-line
  scrollSpy(menu,975);
  // eslint-disable-next-line
  let navigation = responsiveNav(".nav-collapse");
});
