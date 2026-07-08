var circles = {};
  circles['wildland'] = {
	radius: 3337.54318626202,
	zoom: 12
  };
  circles['rural'] = {
	radius: 1784.2085191748185 ,
	zoom: 13
  };
  circles['tompkins'] = {
	radius: 346.413309914545 ,
	zoom: 15
  };
  circles['snohomish'] = {
	radius: 315.64292832712806  ,
	zoom: 15
  };
  circles['ithaca'] = {
	radius: 166.41157131037673  ,
	zoom: 15
  };
  circles['la'] = {
	radius: 63.07814331964388  ,
	zoom: 15
  };
  circles['seattle'] = {
	radius: 401.32771599426707   ,
	zoom: 15
  };
  
var map;
var map_point = new google.maps.LatLng(42.4433, -76.5),
	map_circle,
	marker,
	makeCircle;

function initialize() {
  var mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(39.8282, -95.5795),
    panControl: false,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
      
      
   makeCircle = function(val){
   		 map.setZoom(circles[val].zoom);
   		 map.setCenter(map_point);
   		 if(map_circle) {
	   		 map_circle.setMap(null);
   		 }
   		 
   		 
   		 var circleOptions = {
		      strokeColor: '#FF0000',
		      strokeOpacity: 0,
		      strokeWeight: 2,
		      fillColor: '#f26f17',
		      fillOpacity: 0.35,
		      map: map,
		      center: map_point,
		      radius: circles[val].radius
		    };
		    // Add the circle for this city to the map.
		    map_circle = new google.maps.Circle(circleOptions);
   		 
   };
      
   var input = document.getElementById('autocomplete');
  // var autocomplete = new google.maps.places.Autocomplete(input);
   
   
    var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    
    if (marker) {
	    //for (var i = 0, marker; marker = markers[i]; i++) {
	      marker.setMap(null);
	    //}
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    //var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);
        
	  map.setCenter(place.geometry.location);
	  map.setZoom(10);
	  map_point = place.geometry.location;
	
    }

  });
   
   
      
}

google.maps.event.addDomListener(window, 'load', initialize);



var viz_circles = [
	{
		label: "Seattle Parks, WA",
		radius: 0.24937410118077416 ,
		func: "seattle",
		color: '#f15a2b',
		flavor: 'urban',
		area: 0.2
	},
	{
		label: "Los Angeles, CA",
		radius: 0.039195038537315846 ,
		func: "la",
		color: '#f15a2b',
		flavor: 'urban',
		area: 0.005
	},
	{
		label: "Ithaca, NY",
		radius: 0.10340361347532326,
		func: "ithaca",
		color: '#f06e16',
		flavor: 'suburban',
		area: 0.034
	},
	{
		label: "Snohomish, WA",
		radius: 0.1961319101787864 ,
		func: "snohomish",
		color: '#f06e16',
		flavor: 'suburban',
		area: 0.12
	},
	{
		label: "Tompkins County, NY",
		radius: 0.21525178639351847 ,
		func: "tompkins",
		color: '#f8931f',
		flavor: 'rural',
		area: 0.15
	},
	{
		label: "Olympic Peninsula Campgrounds, WA",
		radius: 1.1086585303135563,
		func: "rural",
		color: '#f8931f',
		flavor: 'rural',
		area: 3.86
	},
	{
		label: "Olympic Peninsula Remote Areas, WA",
		radius: 2.073858343334547 ,
		func: "wildland",
		color: '#fbaf41',
		flavor: 'wildlands',
		area: 13.5
	}
];

$(function(){

	var w = $('#viz-side').width(),
		rScale,
		minR = 2,
		maxR = 60;
	
	var svg = d3.select('#circle-viz').append('svg')
	.attr({
		width: w,
		height: 400
	});
	
	rScale = d3.scale.linear().range([minR,maxR]).domain([0.039, 2.08]);	
	
	var circle_g = svg.append('g');
	var wrapper = d3.select('#circle-viz');
	
	var circles,labels,labes2;
	
	var makeItems = function(){
		circles = circle_g.selectAll('viz-circle').data(viz_circles).enter()
			.append('circle')
			.attr("class",function(d){return 'viz-circle '})
			.style('fill',function(d){return d.color;});
			
		labels = wrapper.selectAll('.place-label').data(viz_circles).enter()
			.append('div')
			.attr('class','place-label')
			.text(function(d){return d.label;})
			
		labels2 = wrapper.selectAll('.place-label2').data(viz_circles).enter()
			.append('div')
			.attr('class','place-label2')
			.text(function(d){return d.area + ' sq. miles';})
	};
	
	
	var updateItems = function(){
		var w = $('#viz-side').width();
		
		// keep tabs of radii so can place
		var rTabs = 0;
		var perPadding = [0,15,20,10,17,-20,-12];
		
		circles.attr({
				cx: w/2 ,
				cy: function(d,i){
					rTabs = rTabs + (rScale(d.radius) * 2) + 10 + perPadding[i];
					return rTabs; 
				},
				r: function(d){return rScale(d.radius);}
			});
		
		// let's just use html
		rTabs = -15;
		perPadding = [3,16,20,9,16,-28,-12];
		labels.style({
				"position":'absolute',
				'left':function(d){
					switch(d.func) {
						case 'wildland':
							return '70%';
						case 'rural':
							return '65%';
						default:
							return '65%';
					}
				},
				
				'top':function(d,i){ rTabs = rTabs + (rScale(d.radius) * 2) + 10 + perPadding[i];
					return rTabs + 'px'; }
			});
			
			rTabs = -2;
			perPadding = [3,16,20,9,16,-15,-12];
			labels2.style({
				"position":'absolute',
				'left':function(d){
					switch(d.func) {
						case 'wildland':
							return '70%';
						case 'rural':
							return '65%';
						default:
							return '65%';
					}
				},
				
				'top':function(d,i){ rTabs = rTabs + (rScale(d.radius) * 2) + 10 + perPadding[i];
					return rTabs + 'px'; }
			});
		
	};
	
	
	makeItems();
	updateItems();	
	
	d3.select(window).on('resize',updateItems);
	
	circles.on('click',function(d){
		var that = this;
		var func = this.__data__.func,
			flavor = this.__data__.flavor,
			color = this.__data__.color;
		
		circles.each(function(d){
			if (this.__data__.func != func) {
				d3.select(this).transition().duration(400).style('fill','#c0c0c0');
			} else {
				d3.select(this).transition().duration(400).style('fill',function(d){return d.color;});
			}
		});
		
		labels.each(function(d){
			if (this.__data__.func != func) {
				d3.select(this).transition().duration(400).style('color','#c0c0c0');
			} else {
				d3.select(this).transition().duration(400).style('color','#444');
			}
		});
		
		labels2.each(function(d){
			if (this.__data__.func != func) {
				d3.select(this).transition().duration(400).style('color','#c0c0c0');
			} else {
				d3.select(this).transition().duration(400).style('color','#444');
			}
		});
		
		d3.selectAll('.sublabel').each(function(){
			
			if (d3.select(this).classed(flavor)) {
				d3.select(this).transition().duration(400).style('color',color);
			} else {
				d3.select(this).transition().duration(400).style('color','#c0c0c0');
			}
			
		});
		
		
		makeCircle(func);
		
		
		
	});
	
	
});

   