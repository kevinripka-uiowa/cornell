(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


$(function(){

	$(window).load(function() {
	  $("body").removeClass("preload");
	});
	
	$('.site-header_button--menu').on('click',function(){
		var $menu = $('.main-nav');
		if ($menu.hasClass('visible')) {
			$menu.removeClass('visible');
		} else {
			$menu.addClass('visible');
		}
	});
	
	
	
	$('body').waypoint({
	  handler: function(direction) {
	    if (direction == 'down') {
	    	$('.site-header').animate({'height':'44px'},200,'easeInOutQuart');
		    $('body').removeClass('at-top');
	    } else {
	    	$('.site-header').animate({'height':'130px'},200,'easeInOutQuart');
		    $('body').addClass('at-top');
	    }
	  },
	  offset: -60
	});
	
	// ugh, i have to resort to javascript becuz i have no patience for IE
	// this fixes layout in ie9, the lowest ie supported
	var fixIElayout = function(){
		var sidebar_width = 350,
			$main = $('.content .span9'),
			page_width = $('body').width(),
			nav_width = 0,
			$nav = $('.main-nav');
						
			if ($nav.css('left') == '0px' ) {
				nav_width = $nav.width();
			}
			
		
		$main.css({'width':(page_width - sidebar_width - nav_width - 10) + 'px'});
		
	};
	
	if ($('html').hasClass('no-flexbox') && $('html').hasClass('no-webkitbox')  ) {
		fixIElayout();
		$(window).smartresize(fixIElayout);
		
		
	}
	
	// stop illustrated answer slideshow clicks for now
	$('.article--illustrated-answer .slides a').on('click',function(){return false;});
	
	
	
	
});