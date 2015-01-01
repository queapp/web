var fanWindowDone;

var startFan = function() {
  $(".speaker-bubble-one").css("opacity", "1");
  setTimeout(function() {
    $(".speaker-bubble-two").css("opacity", "1");
    setTimeout(function() {
      $(".speaker-fan").addClass("spinning");
    }, 500);
  }, 1000);
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
  if ( !fanWindowDone && isScrolledIntoView($(".hero-speaker")) ) {
    // start with a delay
    setTimeout(startFan, 500);
    fanWindowDone = true;
  }
});
