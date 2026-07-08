$(function(){

var total_images = $("body img").length;
var images_loaded = 0;

$("body").find('img').each(function() {

        var fakeSrc = $(this).attr('src');
        $("<img/>").attr("src", fakeSrc).css('display', 'none').on('load',function() {
            images_loaded++;
            if (images_loaded >= total_images) {
                $("body img").show();
                load_slideshows();
            }
        });
 
    });


var load_slideshows = function(){

	var main_has_more_than_one = $('#current-month-slider li').length;
	

	if (main_has_more_than_one > 1) {
		
		var current_month_slider = $('#current-month-slider');
	
		current_month_slider.unslider({
			delay:6000,
			dots: false,
			keys: false,
			fluid: true,
			complete: function(s){
			
				var that = $(s),
					data;
					
				data = that.data('unslider');
										
				var current_index = data.current;
				
				var total_index = $('#current-month-slider li').length - 1;
						
				$('.current-month-header__flyspace .slideshow-wrapper__thumbnav div').removeClass('current');
	
				$('.current-month-header__flyspace .slideshow-wrapper__thumbnav div:eq('+ current_index +')').addClass('current');
				
				if (current_index == 0) { 
					$('#current-month-slider .prev').hide(); 
					$('#current-month-slider .next').show();
				} else
				if (current_index == total_index) { 
					$('#current-month-slider .next').hide(); 
					$('#current-month-slider .prev').show();
				} else {
					$('#current-month-slider .next').show(); 
					$('#current-month-slider .prev').show();
				}
				
				
			}
		}); // current unslider
			
		var	current_month_slider_data = current_month_slider.data('unslider');

	
	} else {
		$('#current-month-slider .unslider-arrow').hide();
	} // main has more than one
	
	
	$('.slider-wrapper--small').each(function(){
		var $that = $(this);
		if ($that.find('li').length > 1) {		
			$that.unslider({
			delay: false,
			speed: 200,
			dots: false,
			keys: false,
			fluid: true,
			complete: function(s){
			

				var that = $(s),
					data,
					slidercount = that.data('slider-count');
				
					data = that.data('unslider');
					
					
				
				var	current_index = data.current,
					total_index = that.find('li').length - 1,
					$prev = that.find('.prev'),
					$next = that.find('.next'),
					$thumbnav = $('#' +that.attr('id') + '-thumbnav');
											
				$thumbnav.find('div').removeClass('current');
	
				$thumbnav.find('div:eq('+ current_index +')').addClass('current');
				
				if (current_index == 0) { 
					$prev.hide(); 
					$next.show();
				} else
				if (current_index == total_index) { 
					$prev.show(); 
					$next.hide();
				} else {
					$prev.show(); 
					$next.show();
				}
				
				
			}
		});

		} else {
			$that.find('.unslider-arrow').hide();
		}
		
		
	});

	
		
	
	
			
	//current_month_slider_data.stop();
	
	
	var resizeMainSlide = function(){
		$('#current-month-slider,#current-month-slider li').css({'height':'auto','overflow':'auto'});
		
		var window_height = $(window).height() - 44,
			slide_height = $('#current-month-slider').height();
			
			
		if (slide_height > window_height) {
			$('#current-month-slider,#current-month-slider li').css({'height':window_height + 'px','overflow':'hidden'});
		} else {
			$('#current-month-slider,#current-month-slider li').css({'overflow':'hidden'});
		}
		
		if (main_has_more_than_one > 1) {
			current_month_slider_data.stop();
			current_month_slider_data.start();
		}
		
		$.waypoints('refresh');
		
		
	};
	
	resizeMainSlide();
	
	$(window).smartresize(resizeMainSlide);
	
	
	// hide all prev arrows on start
	$('.unslider-arrow.prev').hide();
	
	
	/// ok, so it seems like there is no autoplay method but there is a mouseleave that starts the slideshow so overwrite it
	/*
$('.slider-wrapper').on('mouseleave',function(){
		var data = $(this).data('unslider');
		data.stop();
	});
*/
	
	// navigation
	$('.slideshow-wrapper__thumbnav div').on('click',function(){
		var that = $(this),
			moveto = that.data('moveto'),
			$slider = $(that.data('slider')),
			$divs = $('.slideshow-wrapper__thumbnav div'),
			data = $slider.data('unslider');
			
		data.stop();
						
		if (!that.hasClass('current')) {
			data.move(moveto);
			$divs.removeClass('current');
			that.addClass('current');
			data.stop();

			
		}
	});
	
	$('.unslider-arrow').on('click',function(e){
		e.preventDefault();
		var that = $(this),
			$slider = $(that.data('slider')),
			slidercount = that.data('slider-count'),
			direction = that.data('direction'),
			data = $slider.data('unslider');
	
		if (direction == 'next') {
			data.next();
		} else if (direction == 'prev') {
			data.prev();
		}
		
		data.stop();
					
	});
	
	$('.slider-wrapper').on('swipeleft',function(){
		var that = $(this),
			data = that.data('unslider');
						
		if (data.current != that.find('li').length -1) {
			data.next();
		}
	});
	
	$('.slider-wrapper').on('swiperight',function(){
		var that = $(this),
			data = that.data('unslider');
						
		if (data.current != 0) {
			data.prev();
		}
	});
	
};	
	
	/******** MAP ************/
	var svg,map_g,dot_g;
	
	var projection = d3.geo.mercator()
		.scale(140)
		.center([0,10]);
	var path = d3.geo.path()
    	.projection(projection);
	    
	 // fancy footwork pending the json cache  
	var renderSVG = function(){
		var svg_div = d3.select('#map-svg'),
			width = svg_div.attr('width'),
			height = 450;
		
		svg = svg_div.append('svg').attr('width',width).attr('height',height);
		map_g = svg.append('g');
		dot_g = svg.append('g');
		
	};
	
	renderSVG();
	
	var renderBaseMap = function(){
		
		
		d3.json('wp-content/themes/CitSciMonthlyv2/js/topojson/world-50m.json',function(error,world){
			if (error) return console.error(error);
			
			
			map_g.append("path")
		      .datum(topojson.feature(world, world.objects.land))
		      .attr("d", path).attr('class','land');
			
		});
		
	}
	
	renderBaseMap();
	
	var fired = false;
	
	var renderMapDots = function(json){
		dot_g.selectAll('.recent-data-dot').data(json).enter()
			.append("circle")
			.attr("r",1.8	)
			.attr("transform", function(d) {return "translate(" + projection([d.longitude,d.latitude]) + ")";})
			.attr('class',function(d){
				return 'recent-data-dot ' + d.homeProjId.toLowerCase().replace(/ /g,'-');
			}).style('opacity',0);
			
			
		$('#feed-map').waypoint(function(direction){
			if (!fired) {
				d3.selectAll('.recent-data-dot').transition().delay(function(d, i) { return i *20; }).style('opacity',1).attr('r',3).each('end',function(){
					d3.select(this).transition().attr('r','1.8');
				});
				fired = true;
			}
			},{
				offset: $(window).height() - 170
			}
			
		);

	};
	
	
	
	/******* HANDLEBARS ***********/
	var source   = $("#feed-list-template").html();
	var template = Handlebars.compile(source);
	
	var buildFeedList = function(json){
		var context,html,s,
			$feed = $('#feed-list ul');
	
		for (var j in json) {
			json[j].projectLower = json[j].homeProjId.toLowerCase().replace(/ /g, '-');	
			switch(json[j].homeProjId){
				case 'CUB' : 
					json[j].homeProjId = 'Celebrate Urban Birds';
					break;		
				case 'PFW' :
					json[j].homeProjId = 'Project FeederWatch';
					break;		
				}
					
			s = new Date(parseInt(json[j].creationDt)).toISOString();
			json[j].time = s;
			
			json[j].state = json[j].subnational1CodeList.replace('US-','').replace('CA-','');
			
		}
		
		for (var j in json) {
			context = json[j];
			html = template(context);
			$feed.append(html);
		}
	
		$('.feed-list__time').timeago();
		
		
	};
	
	$.ajax('http://api.birds.cornell.edu/clo-ws/citsci/activity/projects/all/recent/geocoded',
			{
				cache:false,
				dataType: 'jsonp',
				timeout:10000,
				error: function() {
					$('#map__loader').hide();
					  var $li = $('<li></li>').text('An error has occurred retrieving the activity feed');
					  $('#feed-list ul').append($li);
					},
				success: function(json){
								
					var data = json.NESTWATCH;
					data = data.concat(json.YARDMAP,json.PFW,json.CUB);
					
					data.sort(function(a,b){
					  return new Date(b.creationDt) - new Date(a.creationDt);
					});
					
					data = data.slice(0,100);
																								
					buildFeedList(data);
					renderMapDots(data);
					$('#map__loader').hide();
				}
				
				
			}
	
	);
	
/*
	$.getJSON('wp-content/themes/CitSciMonthlyv2/js/recent-data.json',function(data){
		
	});
*/
	
	
	/// LOAD UP BOOKFACE
	
	$('#yardmap-facebook').load('wp-content/themes/CitSciMonthlyv2/facebook-yardmap.php #facebook',function(){
		var that = $(this);
		that.parent().find('.loader').hide();
		that.fadeIn(500);
	});
	
	$('#cubs-facebook').load('wp-content/themes/CitSciMonthlyv2/facebook-cubs.php #facebook',function(){
		var that = $(this);
		that.parent().find('.loader').hide();
		that.fadeIn(500);
	});
	
	$('#feederwatch-facebook').load('wp-content/themes/CitSciMonthlyv2/facebook-feederwatch.php #facebook',function(){
		var that = $(this);
		that.parent().find('.loader').hide();
		that.fadeIn(500);
	});
	
	$('#nestwatch-facebook').load('wp-content/themes/CitSciMonthlyv2/facebook-nestwatch.php #facebook',function(){
		var that = $(this);
		that.parent().find('.loader').hide();
		that.fadeIn(500);
	});
		
	
});