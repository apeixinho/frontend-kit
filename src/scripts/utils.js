let $ = window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
  // Main variables
  var mainHeaderHeight = $('.main_header').outerHeight();


  $(window).scroll(function () {
    if ($(window).scrollTop() > mainHeaderHeight) {
      $(".main_header").addClass("sticky");
    } else {
      $(".main_header").removeClass("sticky");
    }
  }); //End window scroll

  $('.main_header a[href^="#"]').on('click', function () {
    // e.preventDefault();
    var target = this.hash,
      $target = $(target);
    mainHeaderHeight = $('.main_header').outerHeight();
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top - mainHeaderHeight
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
  }); // End scroll spy

});
