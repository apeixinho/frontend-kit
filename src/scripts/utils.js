import VanillaScrollspy from 'vanillajs-scrollspy';

let $ = window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
  // Main variables
  var $aboutTitle = $('.about-myself .content h2');
  var $developmentWrapper = $('.development-wrapper');
  var developmentIsVisible = false;
  var mainHeaderHeight = $('header').outerHeight();

  // Cache selectors
  var lastId,
    mainHeader = $('header'),
    // All list items
    menuItems = mainHeader.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function (e) {
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - mainHeaderHeight + 1;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 900, 'swing');
    $(".nav-container").removeClass("sticky");
    $("#menu-nav").prop('checked',false);
    e.preventDefault();
  });

  /* ####### HERO SECTION ####### */

  $('.hero .content .header').delay(500).animate({
    'opacity': '1',
    'top': '50%'
  }, 1000, 'swing');

  $(window).scroll(function () {
    mainHeaderHeight = $('header').outerHeight();

    // Get container scroll position
    var fromTop = $(this).scrollTop() + mainHeaderHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[href='#" + id + "']").parent().addClass("active");
    }

    if ($(window).scrollTop() > mainHeaderHeight) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }

    var bottom_of_window = $(window).scrollTop() + $(window).height();

    /* ##### ABOUT MYSELF SECTION #### */
    if (bottom_of_window > ($aboutTitle.offset().top + $aboutTitle.outerHeight())) {
      $('.about-myself .content h2').addClass('aboutTitleVisible');
    }
    /* ##### EXPERIENCE SECTION #### */

    // Check the location of each element hidden */
    $('.experience .content .hidden').each(function () {

      var bottom_of_object = $(this).offset().top + $(this).outerHeight();

      /* If the object is completely visible in the window, fadeIn it */
      if (bottom_of_window > bottom_of_object) {

        $(this).animate({
          'opacity': '1',
          'margin-left': '0'
        }, 600);
      }
    });

    /*###### SKILLS SECTION ######*/

    var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight() / 2;

    if ((bottom_of_window > middle_of_developmentWrapper) && (developmentIsVisible == false)) {

      $('.skills-bar-container li').each(function () {

        var $barContainer = $(this).find('.bar-container');
        var dataPercent = parseInt($barContainer.data('percent'));
        var elem = $(this).find('.progressbar');
        var percent = $(this).find('.percent');
        var width = 0;

        var id = setInterval(frame, 15);

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
      developmentIsVisible = true;
    }
  }); // -- End window scroll --

   // add click listeners to anchors
   $("#menu-nav").click(function () {
    if ($("#menu-nav").is(':checked')) {
      $(".nav-container").addClass("sticky");
    } else {
      $(".nav-container").removeClass("sticky");
    }
  });

  const navbar = document.querySelector('nav');
  const scrollspy = new VanillaScrollspy(navbar, 875);
  scrollspy.init();

});
