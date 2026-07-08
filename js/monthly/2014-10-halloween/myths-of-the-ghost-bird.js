$(function(){

	var points = [
		{
			"point":[-8,53],
			"html":'<h2>The Banshee</h2><p>Some believe that the Barn Owl is the basis of the Irish and Scottish legend of the Banshee. In the legend, the Banshee is a female spirit who wails when someone is about to die. Listen to the sound of a Barn Owl. Could this be the inspiration?</p><audio controls><source src="http://www.allaboutbirds.org/guide/SOUND/SPECIES/300A.mp3" type="audio/mpeg" /></audio><p class="small">No sound controls here? Your browser may not support our format. Visit the <a href="http://www.allaboutbirds.org/guide/Barn_Owl/id" style="text-decoration:underline;">All About Birds Barn Owl page</a> to listen</p>'
		},{
			"point":[-100,31],
			"html":'<h2>Witches</h2><p>Even in modern-day rural Texas, some people believe Barn Owls are witches who bring curses and bad luck wherever they fly at night.</p>'
		},{
			"point": [-0.1167,51.5],
			"html":'<h2>Weather Owls?</h2><p>In the early 18th and 19th centuries, the Barn Owl was thought to predict the weather. A screeching owl meant cold weather or a storm was coming. If heard during foul weather, a change in the weather was at hand.</p>'
		},{
			"point":[-87.2167,14.1],
			"html":'<h2>Milk-stealing Demons</h2><p>In Honduras, some believe that Barn Owls are demons, who enter through windows at night. As a breastfeeding mother sleeps, the owl will sneak up and take milk night after night, so that she runs out of milk for the baby, who gradually weakens and eventually dies from malnutrition. This belief is also found in European folklore.</p>'
		},{
			"point":[-58.3833,-34.6],
			"html":'<h2>Mourning Owl</h2><p>In some towns of Northern Argentina it is believed that the owl is the incarnation of a mother with seven kids, all of whom died from a cold while she was at a party. When she found out her children were dead, she cried uncontrollably and while washing her face was transformed into an owl.</p>'
		},{
			"point":[-77.0283,-12.0433],
			"html":'<h2>Harbinger of Death</h2><p>In Peru, Bolivia, and Ecuador, some people believe that seeing or hearing an owl announces the death of a relative.</p>'
		},{
			"point":[21.0936,7.1881],
			"html":'<h2>Messengers of Death &amp; Evil Sidekick</h2><p>In many African cultures, the Barn Owl is a either a harbinger whose presence indicates death or ill fortune, or is in league with evil people and sure to bring bad luck.</p>'
		},{
			"point":[-92.5,38.5],
			"html":'<h2>Persecuted Wildlife</h2><p>In many rural areas in the United States and around the world, the Barn Owl is persecuted as it is looked upon as a bad omen. The truth is, Barn Owls provide an important source of rodent pest control that could benefit these rural farming communities. A family of Barn Owls consumes approximately 3,000 rodents per year. A reduction in rodent populations means a reduction in crop damages.</p>'
		},{
			"point":[-3.7,40.4333],
			"html":'<h2>Messengers of Death</h2><p>Like in many other places, Barn Owls are considered messengers of death. In Spain, some people believe the owl must vocalize two to three times over the roof of a home to signify someone close will die.</p>'
		},{
			"point":[139.7667,35.6833],
			"html":'<h2>Demons</h2><p>Even without a native Barn Owl species of its own, some Japanese believe that Barn Owls are demons.</p>'
		},{
			"point":[78.706055,21.943046],
			"html":'<h2>Vahana</h2><p>In Hindu iconography, the vahana is a vehicle of a deity. The owl is a vahana of the goddess Lakshmi, the goddess of wealth, love, prosperity, fortune, and beauty. The connection of owls as a vahana likely comes from their use as rodent pest control.<p>'
		},{
			"point":[133.9,-25.8],
			"html":'<h2>Conflicting Attitudes</h2><p>Some conflicting accounts of Aboriginal myths surrounding the Barn Owl include the idea that women turn into the owls when they die, but also that they can bring bad fortune.</p>'
		},{
			"point":[19.291992,52.375599],
			"html":'<h2>Owls of the Afterlife</h2><p>In Polish folklore, women who die unmarried turn into doves, whereas women who are married when they die turn into owls. In another Polish story, the owl does not come out during the day because it is too beautiful, and would be mobbed by other jealous birds.</p>'
		}
	];
	
	var marker = "M21.576,10.557C21.576,4.727,16.746,0,10.787,0C4.83,0,0,4.727,0,10.557c0,1.068,0.164,2.102,0.467,3.074 H0.462l0.012,0.023c0.48,1.08,10.314,21.091,10.314,21.091s9.834-20.011,10.315-21.093l0.01-0.021h-0.004 C21.412,12.658,21.576,11.625,21.576,10.557z M10.788,16.109c-2.631,0-4.765-2.131-4.765-4.764c0-2.631,2.134-4.764,4.765-4.764 c2.631,0,4.764,2.133,4.764,4.764C15.552,13.979,13.419,16.109,10.788,16.109z";

	var width = function(){
		return parseInt(d3.select('.article__content').style('width'));
	}
	
		
	var height = function(width){
		return width * .5;
	}
	
	var scale = function(width){
		return width / 8;
	}
	
	var translate = function(width) {
		return width * .1;
	};

	// set your height of final map
	var mapWidth = width(),
	    mapHeight = height(width());
	    
	// create the svg in the appropriate holder
	var svgmap = d3.select("#map").append("svg")
	    .attr("width", mapWidth)
	    .attr("height", mapHeight);
	    
	var main_g = svgmap.append("g")
		.attr('transform','translate('+ translate(mapWidth) +',0)');
	    
	
	
	
/*
	var robinson = d3.geo.robinson()
	    .scale(scale(mapWidth))
	    .translate([mapWidth / 2, mapHeight / 2])
	    .precision(.1);
	    
*/
	var robinson = d3.geo.robinson()
	    .scale(scale(mapWidth))
	    .translate([mapWidth/2,mapHeight/2]);
	    
	var albers = d3.geo.albers()
		.scale(1000);
	
	var projection = robinson;
		

	var path = d3.geo.path()
   	 	.projection(projection);
	
		
	var createBaseMap = function(){
		d3.json("/citsci/wp-content/themes/CitSciMonthlyv2.1/js/monthly/2014-10-halloween/all.json", function(error, world) {
		
		
			main_g.insert("path")
			      .datum(topojson.feature(world, world.objects.land))
			      .attr("class", "land")
			      .attr("d", path);
			      
				main_g.insert("path")
			      		 .datum(topojson.feature(world,world.objects.barnowl))
					      .attr("class", "owl")
					      .attr("d", path);
			
			  main_g.insert("path")
			      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
			      .attr("class", "boundary")
			      .attr("d", path);
			      
			  main_g.selectAll(".state")
			      .data(topojson.feature(world, world.objects.layer1).features)
			      .enter()
			      .append("path")
			      .attr("class", "state")
			      .attr("d", path)
			      .attr('id',function(d){ return d.id;});
			  	
			 var p = main_g.selectAll('.point').data(points).enter().append("path")
			  	.attr({
			  		d: marker,
			  		transform: function(d) {
				  		var coords = projection(d.point);
				  		return "translate(" + (coords[0] - 10) + "," + (coords[1] - 36) + ")";
				  		
			  		},
				  "class":'point'
			  	});
			  	
			 p.on('click',function(d){
			 	var modal = d3.select('#modal'); 
			 	modal.style('display','block').style('opacity',0).transition().duration(500).style('opacity',1);
			 	modal.select('#modal-content').html(d.html);
			 });
			 
			 d3.select('#modal-close').on('click',function(){
				 d3.select('#modal').style('opacity',1).transition().duration(500).style('opacity',0).each('end',function(){
					 d3.select(this).style('display','none');
				 });
			 });
			 

			 
			 
		function updateToStates() {
		  svgmap.selectAll(".land,.boundary,.state").transition()
		      .duration(750)
		      .attrTween("d", projectionTween(robinson, projection = albers));

		      
		  d3.selectAll('.owl').transition().duration(700).style('opacity',0);
		  
		  $('#endangered-legend').show();
		}
		
		function updateToWorld() {
			var svg = $('#map');
		
			
		
			svgmap.selectAll(".land,.boundary,.state").transition()
		      .duration(750)
		      .attrTween("d", projectionTween(robinson, projection = robinson)).each('end',function(){
		      	
		       if (svg.hasClass('states')) {
			      d3.selectAll('.owl').style('opacity',0).transition().duration(700).style('opacity',1);
			    } else {
				     d3.selectAll('.owl').style('opacity','1');
			    }
		      });
			//resize();

		  
		  
		  $('#endangered-legend').hide();
		  
		  svgmap.classed('zoomed',false);
		}
		
		

		function projectionTween(projection0, projection1) {
		  return function(d) {
		    var t = 0;
		    
		    	var w = width();
				var h = height(width());
		    
		    var projection;
		    
			    projection = d3.geo.projection(project)
			    	.scale(1)
			    	.translate([w/2,h/2]);

		    var path = d3.geo.path()
		        .projection(projection);
		
		    function project(λ, φ) {
		      λ *= 180 / Math.PI, φ *= 180 / Math.PI;
		      var p0 = projection0([λ, φ]), p1 = projection1([λ, φ]);
		      return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
		    }
		
		    return function(_) {
		      t = _;
		      return path(d);
		    };
		  };
		}
			 
			 
			 $('#toggles label').on('click',function(e){
			 	e.stopPropagation();
				var myths = $('#map svg .point'),
					id = $(this).attr('id'),
					svg = $('#map');
					
				var btns = $('.btn-group label');
				
				btns.removeClass('active');
				$(this).addClass('active');
															
				switch(id) {
					case 'myths':
						if (!svg.hasClass('myths')) {
							myths.show();
							updateToWorld();
							svg.removeClass('states');
							svg.removeClass('world');
							svg.addClass('myths');
						}
						break;
					case 'states':
						if (!svg.hasClass('states')) {
							svg.addClass('states');
							myths.hide();
							updateToStates();
							svgmap.classed('zoomed',true);
							svg.removeClass('myths');
							svg.removeClass('world');
							
						}
						break;
					case 'range':
						if (!svg.hasClass('world')) {
							myths.hide();
							updateToWorld();
							svg.removeClass('states');
							svg.removeClass('myths');
							svg.addClass('world');
						}
						break;
				}
			 });
			 
			 $('#loader').hide();
			 
			
			
			
			      		    
					    	
		}); // end d3.json

		
				

	
	}; // end createBaseMaps 
	

	createBaseMap();
	
	d3.select(window).on('resize', resize);

	function resize() {
	    // adjust things when the window size changes
	    var w = width();
	    var h = height(width());
	
	    // update projection
	    projection
	        .translate([w / 2, h / 2])
	        .scale(scale(w));
	
	    // resize the map container
	    svgmap
	        .style('width', w + 'px')
	        .style('height', h + 'px');
	
	    // resize the map
	    svgmap.select('.land').transition().duration(500).attr('d', path);
	    svgmap.selectAll('.boundary').transition().duration(500).attr('d', path);
	    svgmap.selectAll('.owl').transition().duration(500).attr('d', path);
	    svgmap.selectAll('.state').transition().duration(500).attr('d', path);
	    
	    
	    
	    
	    svgmap.selectAll('.point')
			  	.attr({
			  		transform: function(d) {
				  		var coords = projection(d.point);
				  		return "translate(" + (coords[0] - 10) + "," + (coords[1] - 36) + ")";
				  		
			  		}
			  	});
	    
	}
	


	
});