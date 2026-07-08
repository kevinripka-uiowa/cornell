if (!$.fn.smartresize) {
(function($,sr){
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
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
}
// Utility
if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	var TabAcco = {
		init: function(options,elem){
			var self = this;
			
			self.elem = elem;
			self.$elem = $(elem);
			
			self.options = $.extend( {}, $.fn.tabacco.options, options );
			
			self.datify();
			self.tabsOrAccordion();
			self.attachClicky();
			
		},
		datify: function(){
			// cache all original css numbers in the elements
			var self = this;
			self.$elem.find('.tabacco__header').each(function(){
				var that= $(this);
				that.data('tb-width', that.width() + self.options.tabPaddingLeft + self.options.tabPaddingRight + self.options.tabMarginLeft + self.options.tabMarginRight );
			});
			self.$elem.find('.tabacco__content').each(function(){
				var that = $(this);
				that.data('tb-ogMarginTop',that.css('marginTop').replace('px',''));
			});	
		},
		tabsOrAccordion: function(){
			var self = this;
			
			self.flyspace = self.$elem.width() - (parseInt(self.$elem.css('paddingLeft'))) - (parseInt(self.$elem.css('paddingRight')));
			
			var $tabs = self.$elem.find('.tabacco__header');
			
			var loopit = function(){
			
				var width_holder = 0,
				tab_width,
				$tab,
				center_push,
				tab_widths;
			
			for (var i = 0; i < $tabs.length; i++) {
				$tab = $($tabs[i]);
				tab_width = $tab.data('tb-width');
				
				width_holder += tab_width;
								
				
				if (width_holder > self.flyspace) {
					self.$elem.find('.tabacco__wrapper').removeClass('tabacco--tabs').addClass('tabacco--accordion')
					
					self.$elem.find('.tabacco__content').each(function(){
						var that = $(this);
						that.css({'marginTop':that.data('tb-ogMarginTop') + 'px' });
					});
					
					return;
				} 
				
				if (i == $tabs.length - 1) {
					self.$elem.find('.tabacco__wrapper').removeClass('tabacco--accordion').addClass('tabacco--tabs');
					
					tab_widths = 0;
					
					$tabs.each(function(){
						var that = $(this),
							left = that.data('tb-width');
							
						(self.options.centerTabs) ? that.css({'left':(tab_widths + ((self.flyspace - width_holder)/2)) + 'px'}) : that.css({'left':tab_widths + 'px'});
							
						
						
						
						tab_widths+=left;
					});
					
					var push;
					
					if (self.options.tabMinHeight) {
						push = self.options.tabMinHeight;
					} else {
					
						var t = $($tabs[0]);
						push = t.height() + (parseInt(t.css('paddingTop'))) + (parseInt(t.css('paddingBottom'))) + (parseInt(t.css('marginTop'))) + (parseInt(t.css('marginBottom'))) + (parseInt(t.css('borderTopWidth'))) + (parseInt(t.css('borderBottomWidth'))) ;
					
					}
					
					self.$elem.find('.tabacco__content').css('marginTop',push  + 'px');
					
					// find out if there is an active from wherever, if not make first one
					var active = self.$elem.find('.active');
					if (active.length == 0) {
						$($tabs[0]).parent().addClass('active');
					}
					
					
				} // end of tabs
				
			}
				
			};
			loopit();
			
			
			
			
		}, //tabsOrAccordion
		attachClicky : function(){
			var self = this,
				$clickers = self.$elem.find('.tabacco__header');
			
			$clickers.on('click',function(){
				var flavor,
					that = $(this),
					$parent = that.parent(),
					$content = $parent.find('.tabacco__content');
					
				if (self.$elem.find('.tabacco__wrapper').hasClass('tabacco--tabs')) {
					flavor = 'tabs';
				} else {
					flavor = 'accordion';
				}
				
				if (flavor == 'tabs') {
					$clickers.parent().removeClass('active');
					$parent.addClass('active');
					self.$elem.find('.tabacco__content').hide();
					$parent.find('.tabacco__content').show();
					
					
				} else {
					
				
					if ($parent.hasClass('active')) {
						$clickers.parent().removeClass('active');
						$clickers.parent().find('.tabacco__content:visible').slideUp(100);
					} else {
						$clickers.parent().removeClass('active');
						$clickers.parent().find('.tabacco__content:visible').slideUp(100);
						$content.slideDown(200);
						$parent.addClass('active');
					}
				}
				
				
			});
			
		}
	};
	
	$.fn.tabacco = function( options ) {
		return this.each(function() {
		
			var tb = Object.create( TabAcco );
			
			tb.init( options, this );

			$.data( this, 'tabacco', tb );
			
			if ($.fn.smartresize) {
				$(window).smartresize(function(){tb.tabsOrAccordion();});
			} else {
				$(window).on('resize',function(){tb.tabsOrAccordion();});
			}
			
			
			
		});
	};
	
	$.fn.tabacco.options = {
		tabPaddingTop:0,
		tabPaddingRight:0,
		tabPaddingBottom:0,
		tabPaddingLeft:0,
		tabMarginTop:0,
		tabMarginRight:0,
		tabMarginBottom:0,
		tabMarginLeft:0,
		centerTabs: false,
		tabMinHeight: false
	};
})(jQuery, window, document);