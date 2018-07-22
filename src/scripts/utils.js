let $ = window.$ = window.jQuery = require('jquery');

$(document).ready(function () {
  // Main variables
  var lastId,
    topHeader = $("header"),
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
      offsetTop = href === "#" ? 0 : $(href).offset().top - topHeaderHeight + 1;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 500, 'swing');
    $(".nav-container").removeClass("sticky");
    $("#menu-nav").prop('checked', false);
    e.preventDefault();
  });

  $(window).scroll(function () {

    topHeaderHeight = topHeader.outerHeight();
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
    } else {
      topHeader.removeClass("sticky");
    }
  });
  // add click listeners to anchors
  $("#menu-nav").click(function () {
    if ($("#menu-nav").is(':checked')) {
      $(".nav-container").addClass("sticky");
    } else {
      $(".nav-container").removeClass("sticky");
    }
  });
});
