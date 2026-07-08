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
	
	
	
	/************ BEGIN PARALLEL COORDS GRAPH ********************/
	
	var beat_data = [
		{	species:'Giant Hummingbird',
			image: 'giant-hummingbird.jpg',
			wingspan: 8.5,
			beats : 15,
			color: '#625c3c',
			text: 'With an avg. 8.5" wingspan, the Giant Hummingbird, the largest of all hummingbirds, has the slowest avg. wingbeats per second'
		},
		{	species:'Rufous Hummingbird',
			image: '',
			wingspan: 4.3,
			beats : 57,
			color: '#f6aa25',
			text: 'Rufous Hummingbird'
		},
		{	species:'Ruby-throated Hummingbird',
			image: '',
			wingspan: 3.7,
			beats : 53,
			color: '#f62533',
			text: 'Ruby-throated Hummingbird'
		},
		{	species:'Broad-tailed Hummingbird',
			image: '',
			wingspan: 5.1,
			beats : 50,
			color: '#c673bc',
			text: 'Broad-tailed Hummingbird'
		},
		{	species:'Black-chinned Hummingbird',
			image: '',
			wingspan: 4.3,
			beats : 50,
			color: '#404040',
			text: 'Black-chinned Hummingbird'
		},
		{	species:"Anna's Hummingbird",
			image: '',
			wingspan: 4.7,
			beats : 45,
			color: '#f625db',
			text: "Anna's Hummingbird"
		},
		{	species:"Bee Hummingbird",
			image: '',
			wingspan: 1.3,
			beats : 80,
			color: '#38578b',
			text: "Holding the title of smallest bird in the world, the Bee Hummingbird averages 80 wingbeats per second"
		}

	];
	
	var imgURL = '/citsci/wp-content/themes/CitSciMonthlyv2/img/article-images/2014-07-hummingbirds/beat-the-beats/';
	
	
	var renderWingspans = function(){
		var width = $('#wingspans').width(),
			height = 500,
			margin = {
				top: 50,
				left: 275,
				bottom: 50,
				right: 250
			},
			axis_distance = width - margin.left - margin.right - 50,
			dot_radius = 4;
			
		$('#wingspan-svg').empty();
	
		var svg = d3.select('#wingspan-svg').append('svg')
			.attr('width',width)
			.attr('height',height);
			
		var wingspan_scale = d3.scale.linear()
			.domain([0,9])
			.range([height - margin.bottom, margin.top]);
			
		var beat_scale = d3.scale.linear()
			.domain([0,100])
			.range([height - margin.bottom, margin.top]);
			
		var wingspan_axis = d3.svg.axis()
          .scale(wingspan_scale)
          .orient("left")
          .ticks(9)
          .tickPadding(5);
	    svg.append("g")
	    	.call(wingspan_axis)
	    	.attr('transform','translate('+ margin.left +',0)');
	    	
	    var beat_axis = d3.svg.axis()
          .scale(beat_scale)
          .orient("right")
          .ticks(10)
          .tickPadding(5);
	    svg.append("g")
	    	.call(beat_axis)
	    	.attr('transform','translate('+ (margin.left + axis_distance) +',0)');
	    	
	    
	    var wingspan_dots = svg.selectAll('.wingspan-dot').data(beat_data).enter()
	    	.append('circle')
	    	.attr('cx',margin.left)
	    	.attr('cy',function(d){
	    		return wingspan_scale(d.wingspan);
	    	})
	    	.attr('r',dot_radius)
	    	.style('fill',function(d){
	    		return d.color;
	    	})
	    	.attr('class',function(d){
	    		return 'wingspan-dot ' + d.species.replace(/ /g,'-').replace("'",'');
	    	});
	    	
	    var wingspan_dots = svg.selectAll('.beat-dot').data(beat_data).enter()
	    	.append('circle')
	    	.attr('cx',margin.left + axis_distance)
	    	.attr('cy',function(d){
	    		return beat_scale(d.beats);
	    	})
	    	.attr('r',dot_radius)
	    	.style('fill',function(d){
	    		return d.color;
	    	})
	    	.attr('class',function(d){
	    		return 'beat-dot ' + d.species.replace(/ /g,'-').replace("'",'');
	    	});
	    	
	    var connectors = svg.selectAll('.connector').data(beat_data).enter()
	    	.append('line')
	    	.attr('x1',margin.left)
	    	.attr('y1',function(d){
	    		return wingspan_scale(d.wingspan);
	    	})
	    	.attr('x2',margin.left + axis_distance)
	    	.attr('y2',function(d){
	    		return beat_scale(d.beats)
	    	})
	    	.style('stroke',function(d){
	    		return d.color;
	    	})
	    	.attr('class','connector');
	    	
	    var wingspan_label1 = svg.append('text')
	    	.text('Wingspan')
	    	.attr('x',margin.left - 5)
	    	.attr('y',margin.top - 30)
	    	.attr('class','label top');
	    	
	    var wingspan_label2 = svg.append('text')
	    	.text('(in inches)')
	    	.attr('x',margin.left - 5)
	    	.attr('y',margin.top - 18)
	    	.attr('class','label bottom');
	    	
	     var beat_label1 = svg.append('text')
	    	.text('Average Beats')
	    	.attr('x',margin.left + axis_distance + 10)
	    	.attr('y',margin.top - 30)
	    	.attr('class','label top');
	    	
	    var beat_label2 = svg.append('text')
	    	.text('(per Second)')
	    	.attr('x',margin.left + axis_distance + 10)
	    	.attr('y',margin.top - 18)
	    	.attr('class','label bottom');
	    	

	    var bird_g = svg.append('g')
	    	.attr('transform','translate(0,30)');
	    		    
	    var mask = bird_g.selectAll('.mask').data(beat_data).enter()
	    	.append('svg:clipPath')
	    	.attr('id',function(d){
	    		return 'mask-' + d.species.replace(/ /g,'-').replace("'",''); 
	    	})
	    	.attr('class','mask')
	    	.append('circle')
	    	.attr('cx',function(d,i){
		    	if (i%2 == 1) {
			    	return 75/2 + 10;
		    	} else {
			    	return 125 + (75/2);
		    	}
	    	})
	    	.attr('cy',function(d,i) {
		    	return i*55 + (75/2) + 10;
	    	})
	    	.attr('r',75/2)
	    	.style('fill','none')
	    	.style('stroke',function(d){return d.color;})
	    	.style('stroke-width','4px');
	    
	    //becuz it seems like i can't get a stroke on a clip path
	    var bird_circles = bird_g.selectAll('.bird-circle').data(beat_data).enter()
	    	.append('circle')
	    	.attr('cx',function(d,i){
		    	if (i%2 == 1) {
			    	return 75/2 + 10;
		    	} else {
			    	return 125 + (75/2);
		    	}
		    })
		    .attr('cy',function(d,i) {
		    	return i*55 + (75/2) + 10;
	    	})
	    	.attr('r',42)
	    	.style('fill',function(d){return d.color;})
	    	.attr('class','bird-circle');
	    	
	    var bird_imgs = bird_g.selectAll('.bird-img').data(beat_data).enter()
	    	.append('image')
	    	.attr('x',function(d,i){
		    	if (i%2 == 1) {
			    	return 10;
		    	} else {
			    	return 125;
		    	}
	    	})
	    	.attr('y',function(d,i) {
		    	return i*55 +10;
	    	})
	    	.attr('width',75)
	    	.attr('height',75)
	    	.attr('xlink:href',function(d){return imgURL + d.species.replace(/ /g,'-').replace("'",'').toLowerCase() + '.jpg';})
	    	.attr('class','bird-img')
	    	.attr('clip-path',function(d){
	    		return 'url(#mask-' + d.species.replace(/ /g,'-').replace("'",'') + ')'; 
	    	})
	    	.style('stroke',function(d){return d.color;})
	    	.style('stroke-width','4px');
	    	
	   
	   
	  function wrap(text, width) {
		  text.each(function() {
		    var text = d3.select(this),
		        words = text.text().split(/\s+/).reverse(),
		        word,
		        line = [],
		        lineNumber = 0,
		        lineHeight = 1.1, // ems
		        y = text.attr("y"),
		        x = text.attr("x"),
		       // dy = parseFloat(text.attr("dy")),
		        dy= 1,
		        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
		    while (word = words.pop()) {
		      line.push(word);
		      tspan.text(line.join(" "));
		      if (tspan.node().getComputedTextLength() > width) {
		        line.pop();
		        tspan.text(line.join(" "));
		        line = [word];
		        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		      }
		    }
		  });
		}
	    	
	  var bird_labels = svg.selectAll('.bird-info').data(beat_data).enter()
	    	.append('text')
	    	.attr('class','bird-info')
	    	.style('opacity',function(d){
	    		if (d.species == 'Bee Hummingbird' || d.species == 'Giant Hummingbird') {
		    		return 1;
	    		} else {
		    		return 0;
	    		}
	    	})
	    	.attr('x',function(d){
	    		if (d.species == 'Bee Hummingbird' || d.species == 'Giant Hummingbird') {
		    		return margin.left + axis_distance + 50;
	    		} else {
		    		return margin.left + axis_distance + 33;
	    		}
	    	})
	    	.attr('y',function(d){
	    		if (d.species == 'Bee Hummingbird' || d.species == 'Giant Hummingbird') {
	    			return beat_scale(d.beats) - 10;
	    		} else {
		    		return beat_scale(d.beats) -8;
	    		}
	    	})
	    	.style('fill','#666')
	    	.style('font-size','12px')
	    	.text(function(d){return d.text})
	    	.call(wrap,180);
	    	
	    	
	    	    	
	  /*
  var bird_labels = svg.selectAll('.bird-info').data(beat_data).enter()
	    	.append('foreignObject')
	    	.attr('class','bird-info')
	    	.style('opacity',function(d){
	    		if (d.species == 'Bee Hummingbird' || d.species == 'Giant Hummingbird') {
		    		return 1;
	    		} else {
		    		return 0;
	    		}
	    	})
	    	.attr('x',function(d){
	    		if (d.species == 'Bee Hummingbird' || d.species == 'Giant Hummingbird') {
		    		return margin.left + axis_distance + 50;
	    		} else {
		    		return margin.left + axis_distance + 33;
	    		}
	    	})
	    	.attr('y',function(d){
	    		return beat_scale(d.beats) -7;
	    	})
	    	.style('fill','none')
	    	//.attr('width', width - margin.left - axis_distance -170)
	    	.attr('width', 180)
	    	.attr('height','80')
	    	.append("xhtml:body")
	    	.html(function(d){return d.text})
	    	.style('background','transparent')
	    	.style('font-size','12px')
	    	.style('color','#666');
*/
	    	
	    	
	    	
	    var onMouseAction = function(){
	    	var that = this;
	    	var species = that.__data__.species;
	    		    	
		   	svg.selectAll('.wingspan-dot,.beat-dot,.connector,.bird-info').transition().duration(50).style('opacity',function () {
	        	return (this.__data__.species == species) ? 1 : 0;
			});
			
			svg.selectAll('.bird-img,.bird-circle').transition().duration(50).style('opacity',function () {
	        	return (this.__data__.species == species) ? 1 : .1;
			});
			
		};
	    	
	    	
	    svg.selectAll('.wingspan-dot,.beat-dot,.connector,.bird-img').on('mouseenter',onMouseAction);
	    svg.selectAll('.wingspan-dot,.beat-dot,.connector,.bird-img,.bird-circle').on('touchstart',onMouseAction);
	    
	     svg.selectAll('.wingspan-dot,.beat-dot,.connector,.bird-img').on('mouseleave',function(){
	     	svg.selectAll('.wingspan-dot,.beat-dot,.connector,.bird-img,.bird-circle').transition().duration(50).style('opacity',1);
	     	svg.selectAll('.bird-info').style('opacity',function(d){
	     		if ((d.species == 'Bee Hummingbird') || (d.species == 'Giant Hummingbird')) {
		    		return 1;
	    		} else {
		    		return 0;
	    		}
	     	});
	     });
		
	};
	renderWingspans();
	
	$(window).smartresize(renderWingspans);
	
});