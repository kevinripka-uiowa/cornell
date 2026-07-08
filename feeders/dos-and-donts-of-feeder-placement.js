$(function(){ 
function drawCircle(point, radius, dir) { 
var d2r = Math.PI / 180;   // degrees to radians 
var r2d = 180 / Math.PI;   // radians to degrees 
var earthsradius = 3963; // 3963 is the radius of the earth in miles

   var points = 32; 

   // find the raidus in lat/lon 
   var rlat = (radius / earthsradius) * r2d; 
   var rlng = rlat / Math.cos(point.lat() * d2r); 


   var extp = new Array(); 
   if (dir==1)	{var start=0;var end=points+1} // one extra here makes sure we connect the
   else		{var start=points+1;var end=0}
   for (var i=start; (dir==1 ? i < end : i > end); i=i+dir)  
   { 
      var theta = Math.PI * (i / (points/2)); 
      ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
      ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
      extp.push(new google.maps.LatLng(ex, ey)); 
      bounds.extend(extp[extp.length-1]);
   } 
   // alert(extp.length);
   return extp;
   }

var map = null;
var bounds = null;
var map_point = new google.maps.LatLng(42.4433, -76.5),
	map_circle,
	marker,
	makeCircle,
	polygons = [];

function initialize() {
  var mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(39.8282, -95.5795),
    panControl: false,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  map.setTilt(0);
  bounds = new google.maps.LatLngBounds();
 
   var input = document.getElementById('autocomplete');
   
   
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
   bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
        
	  map.setCenter(place.geometry.location);
	  map.setZoom(25);
	  map_point = place.geometry.location;
	  map.setTilt(0);
	  	  
	  
	  

	  
    }
    
          

  }); // places changed
  
  google.maps.event.addListener(map, 'click', function(event) {
    var donut = new google.maps.Polygon({
                 paths: [drawCircle(event.latLng, 0.00568182, 1),
                         drawCircle(event.latLng, 0.000568182, -1)],
                 strokeColor: "#990000",
                 strokeOpacity: 0.8,
                 strokeWeight: 2,
                 fillColor: "#FF0000",
                 fillOpacity: 0.25,
                 clickable: false
     });
     polygons.push(donut);
     donut.setMap(map);
     
     var clear = $('#clear-danger');
     clear.slideDown(100,'easeInOutQuad');
     
  });
   
   
      
}

google.maps.event.addDomListener(window, 'load', initialize);  


	$('#clear-danger').on('click',function(){
		for (var i=0;i<polygons.length;i++){
			polygons[i].setMap(null);
		}
		polygons = [];
		
		$(this).slideUp(100,'easeInOutQuad');
		
	});
	

	
	
});