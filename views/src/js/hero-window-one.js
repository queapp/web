// ============
// This script animates the 1st hero window: the cursor that enables a thing
// ============
var topOffset, leftOffset, heroWindowDone;

// 1 is biggest
// 3 is smallest
var whichType = function() {
  if ($(window).width() > 1200) {
    return $(window).height() > 750 && 1 || 2;
  } else {
    return 3;
  }
};

if (whichType() == 1) {
  // bigger version
  topOffset = 32;
  leftOffset = 0;
  var points = [
    [880, 36, "things.png"],
    [950, 420, "things-on.png"]
  ];
} else if (whichType() == 2) {
  topOffset = 24;
  leftOffset = 242;
  var points = [
    [710, 12, "things.png"],
    [750, 176, "things-on.png"]
  ];
} else {
  topOffset = 24;
  leftOffset = 242;
  var points = [
    [610, 12, "things.png"],
    [650, 176, "things-on.png"]
  ];
}

var startCursor = function() {
  var cursor = $(".cursor");
  var inset = $(".inset");
  // move to next point
  for (var i = 0; i < points.length; i++) {
    point = points[i];
    cursor.animate({
      left: point[0],
      top: point[1]+topOffset,
      letterSpacing: i+"px"
    }, 2500, function() {
      i = parseInt(cursor.css("letterSpacing").slice(0, -2)) || 0;
      inset.attr("src", "/src/img/"+points[i][2]);
      console.log(points.length, i)
      if (points.length-1 <= i) {
        // we're done! fade out.
        cursor.animate({opacity: 0}, 500);
      }
    });
  };
};

// is the element fully visible?
var isScrolledIntoView = function(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}


$(window).scroll(function() {
  if ( !heroWindowDone && isScrolledIntoView($(".hero-window")) ) {
    // start with a delay
    setTimeout(startCursor, 1000);
    heroWindowDone = true;
  }
});
