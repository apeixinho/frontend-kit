let $ = window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
  // Main variables
  // var mainHeaderHeight = $('.main_header').outerHeight();

  var lastId,
    topHeader = $('.main_header'),
    topHeaderHeight = topHeader.outerHeight(),
    // All list items
    menuItems = topHeader.find("a"),
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
      offsetTop = href === "#" ? 0 : $(href).offset().top - topHeaderHeight;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 500, 'swing');
    e.preventDefault();
  });

  console.log('check header height ' + topHeaderHeight);
  console.log('lastid' + lastId);
  console.log('scrooltimes ' + scrollItems.length);
  // Bind click handler to menu items



  $(window).scroll(function () {

    topHeaderHeight = topHeader.outerHeight();
    // console.log('thh  '+topHeaderHeight);
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topHeaderHeight;

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

    if ($(window).scrollTop() > topHeaderHeight) {
      topHeader.addClass("sticky");
      // console.log("added sticky, has sticky "+topHeader.hasClass('sticky'))
    } else {
      topHeader.removeClass("sticky");
    }
  }); //End window scroll

  // $('.main_header a[href^="#"]').on('click', function () {
  //   // e.preventDefault();
  //   var target = this.hash,
  //     $target = $(target);
  //   mainHeaderHeight = $('.main_header').outerHeight();
  //   $('html, body').stop().animate({
  //     'scrollTop': $target.offset().top - mainHeaderHeight
  //   }, 900, 'swing', function () {
  //     window.location.hash = target;
  //   });
  // });
  // End scroll spy

});
