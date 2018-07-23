import scrollSpy from './scrollspy';

// on document ready
document.addEventListener('DOMContentLoaded', function () {

   // Main variables
   // eslint-disable-next-line
   let aboutTitle = document.querySelector('.about-myself .content h2');
   let developmentWrapper = document.querySelector('.development-wrapper');
   let developmentIsVisible = false;
   // eslint-disable-next-line
   let mainHeaderHeight = document.querySelector('header').offsetHeight;

  //on window scroll
  window.onscroll = function () {

    let topHeader = document.querySelector('header');
    let topHeaderHeight = topHeader.offsetHeight;
    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition > topHeaderHeight) {
      topHeader.classList.add("sticky");
    } else {
      topHeader.classList.remove("sticky");
    }

    // let bottom_of_window = document.window.scrollTop + document.window.offsetHeight;
    let bottom_of_window = window.document.scrollTop + window.document.offsetHeight;

    /* ##### ABOUT MYSELF SECTION #### */
    if (bottom_of_window > (aboutTitle.offsetTop + aboutTitle.offsetHeight)) {
      aboutTitle.classList.add("aboutTitleVisible");
    }
    /* ##### EXPERIENCE SECTION #### */
    // Check the location of each element hidden */
    // $('.experience .content .hidden').each(function () {

    //   var bottom_of_object = $(this).offset().top + $(this).outerHeight();

    //   /* If the object is completely visible in the window, fadeIn it */
    //   if (bottom_of_window > bottom_of_object) {

    //     $(this).animate({
    //       'opacity': '1',
    //       'margin-left': '0'
    //     }, 600);
    //   }
    // });



    /*###### SKILLS SECTION ######*/

    let middle_of_developmentWrapper = developmentWrapper.offsetTop + developmentWrapper.offsetHeight / 2;

    if ((bottom_of_window > middle_of_developmentWrapper) && (developmentIsVisible == false)) {

      let elements = document.querySelectorAll('.skills-bar-container li');
      // eslint-disable-next-line
      Array.prototype.forEach.call(elements, function(el, i){
        let barContainer = this.querySelectorAll('.bar-container');
        let dataPercent = parseInt(barContainer.data('percent'));
        let elem = this.querySelectorAll('.progressbar');
        let percent = this.querySelectorAll('.percent');
        let width = 0;
        let id = setInterval(frame, 15);

        function frame() {
          if (width >= dataPercent) {
            clearInterval(id);
          } else {
            width++;
            elem.css("width", width + "%");
            percent.html(width + " %");
          }
        }
      });

      // $('.skills-bar-container li').each(function () {

      //   var $barContainer = $(this).find('.bar-container');
      //   var dataPercent = parseInt($barContainer.data('percent'));
      //   var elem = $(this).find('.progressbar');
      //   var percent = $(this).find('.percent');
      //   var width = 0;

      //   var id = setInterval(frame, 15);

      //   function frame() {
      //     if (width >= dataPercent) {
      //       clearInterval(id);
      //     } else {
      //       width++;
      //       elem.css("width", width + "%");
      //       percent.html(width + " %");
      //     }
      //   }
      // });
      developmentIsVisible = true;
}

  };
  let menu = document.querySelector('.navbar');
  // eslint-disable-next-line
  scrollSpy(menu,875);
});
