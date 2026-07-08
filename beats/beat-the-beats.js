$(function(){

	
	var bb_svg,
		bb_user_rect,
		bb_hummer_rect,
		rect_height = 80;
		
	var margin = {top:20,left:0,right:10,bottom:0},
			width = $('#beat-svg').width(),
			height = 265,
			label_height = 50,
			rect_space_btwn = 33;

		
		
	var render_beatline = function(rate,rect,width,translate_from_top,id,animate) {
			d3.select('#'+id).remove();
	
			//// X axis	function
			var xScale = d3.scale.linear()
				.domain([1,rate * 5 * 2])
				.range([0,width]);
			
			
			//	y axis function
			var yScale = d3.scale.linear()
				.domain([-10,10])
				.range([0,rect_height - 20]);	
				
			// line generator function
			var line = d3.svg.line()
			    .x(function(d) { return xScale(d.x); })
			    .y(function(d) { return yScale(d.y); })
			    .interpolate('monotone');
			    
			 var data = [],
			 	tempObj = {};
			 
			 for (var i = 1; i <= rate*5*2;i++) {
			 	tempObj = {};
			 	tempObj.x = i;
			 	(i%2 == 0) ? tempObj.y = -10 : tempObj.y = 10;
			 	data.push(tempObj);
			 }
			 
			 function pathTween() {
			    var interpolate = d3.scale.quantile()
			            .domain([0,1])
			            .range(d3.range(1, data.length + 1));
			    return function(t) {
			        return line(data.slice(0, interpolate(t)));
			    };
			   }
			
			
			// gpa path
			
			if (animate) {
				bb_svg.append("path")
					.attr('transform','translate(0,' + (translate_from_top + 10) + ')')
					 .attr('d', line(data))
					.transition() // start a transition to bring the new value into view
					.duration(5000)
					.ease('linear')
					.attrTween('d', pathTween)
					.attr('id',id);
			} else {
				bb_svg.append("path")
					.attr('transform','translate(0,' + (translate_from_top + 10) + ')')
					 .attr('d', line(data))
					.attr('id',id);
				
			}
			
		};
	
	var render_bb_base = function(){
			
				
		bb_svg = d3.select('#beat-svg').append('svg')
			.attr('width',width)
			.attr('height',height);
			
		bb_user_rect = bb_svg.append('rect')
			.attr('width',width - margin.right)
			.attr('height',rect_height)
			.attr('x',1)
			.attr('y',margin.top + label_height + rect_height + rect_space_btwn);
			
		bb_hummer_rect = bb_svg.append('rect')
			.attr('width',width - margin.right)
			.attr('height',rect_height)
			.attr('x',1)
			.attr('y',margin.top + label_height);
			
		var lines_g = bb_svg.append('g'),
			line_spacing = (width-margin.right) / 5;
			
		for (var i = 0; i < 5; i++){
			lines_g.append('line')
				.attr('x1',(i +1)*line_spacing +1)
				.attr('y1',margin.top + label_height - 20)
				.attr('x2',(i +1)*line_spacing+1)
				.attr('y2',height -1);
		}
		
		var labels_g = bb_svg.append('g'),
			label;
		
		for (var i =0; i<=5; i++){
			label = labels_g.append('text')
				.attr('x',(i)*line_spacing -3)
				.attr('y',margin.top + 20);
				
				if (i==0) {
					label.text('seconds')
						.attr('x',1);
				} else {
					label.text(i);
				}
			;
		}
		
		render_beatline(53,bb_hummer_rect,width-margin.right,label_height + margin.top,'hummerpath');
		
		
	};
	
	render_bb_base();
	
	var $lights = $('#lights'),
		$hitzone = $('#beat-hitzone'),
		$p = $hitzone.find('p'),
		$start = $('#start-btn'),
		user_hits = 0,
		seconds = 5,
		setClock,
		$chart = $('.beat-chart-bg')
		$chartline = $chart.find('div'),
		ticks = 0;
		
				
	var renderUserClicks = function(){
		$hitzone.hide();
		$lights.hide();
		$start.show();
		$('#user .number').text(user_hits/5);
		
		$hitzone.off('click');
		$lights.find('.go').removeClass('on');
		$chartline.css({'width':'0px'});
		$p.text('Click anywhere in this box on go!');
		if (user_hits != 0) {
			render_beatline(53,bb_hummer_rect,width-margin.right,label_height + margin.top,'hummerpath',true);
			render_beatline(user_hits/5,bb_user_rect,width-margin.right,label_height + margin.top + rect_space_btwn + rect_height,'userpath',true);
		}
		user_hits = 0;
	};
	
	
	var calculating = function(){
		$p.text('Calculating beats...');
		setTimeout(renderUserClicks,2000);
	}
	
	var tickClock = function(){
		ticks++;
		if (ticks != 5){
			$chartline.stop().animate({'width':(ticks * secondWidth) + 'px'},1000,'linear');
		}
				
		
		seconds--;
		$p.text(seconds);
		if (seconds == 0) {
			clearInterval(setClock);
			calculating();
		}

	}
		
	var recordHits = function(){
		user_hits = 0;
		if ($('html').hasClass('touch')) {
			$hitzone.on('tap',function(){
				user_hits++;
			});

		} else {
			$hitzone.on('click',function(){
				user_hits++;
			});
		}
		
	};
		
	var makeClock = function(){
		recordHits();
		setClock = setInterval(tickClock, 1000);
		$p.text(seconds);
	}
		
	var goLight = function(){
		$lights.find('.set').removeClass('on');
		$lights.find('.go').addClass('on');
		$lights.animate({'opacity':0},1000);
		
		makeClock();
	};

		
	var setLight = function(){
		//$p.stop().css({'fontSize':'72px','opacity':1}).text('2').animate({'opacity':0,'fontSize':'18px'},1000);
		$lights.find('.ready').removeClass('on');
		$lights.find('.set').addClass('on');
		setTimeout(goLight, 1000);
		secondWidth = $chart.width()/4;
	};
	
	var playLights = function(){
		//$p.text('3').css({'fontSize':'72px'}).animate({'opacity':0,'fontSize':'18px'},1000);
		setTimeout(setLight, 1000);
	};
		
	var game_init = function(){
		$hitzone.css('opacity',0).show().animate({'opacity':1},500);
		$lights.show().css('opacity',1);
		$lights.find('.ready').addClass('on');
		$start.hide();
		seconds = 5;
		user_hits = 0;
		playLights();
		$chart.css('opacity',0).show().animate({'opacity':1},1000);
		ticks=0;
	};
	
	
	
	$('#start-btn').on('click',game_init);
	
	$(window).smartresize(function(){
		// set width variable
		$('#beat-svg').empty();
		width = $('#beat-svg').width();
		render_bb_base();
		
		if ($('#user .number').text() != "??") {
			render_beatline(parseFloat($('#user .number').text()),bb_user_rect,width-margin.right,label_height + margin.top + rect_space_btwn + rect_height,'userpath');
		}
		
	});
	
	

	
});