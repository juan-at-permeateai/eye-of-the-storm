		var map;
		var chicago = {lat: 41.85, lng: -87.65};
		var myLatLng = {lat: 26.386417, lng:  -80.119680};
		var array = [];	
		function initMap() {
		
		
        map = new google.maps.Map(document.getElementById('map'), {
			zoom: 14,
			center: myLatLng,
			rotateControl: true,
			streetViewControl: false,
			fullscreenControl: false,
			mapTypeControl: false,
			styles : mapStyle,
        });
        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);
        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
		
		
		var legend = document.getElementById('legend');
		var div = document.createElement('div');
		//idk if this should be html   *****************************update source
		div.innerHTML = '<img id="arrow" src="media/right-arrow.svg"'+'height="20" width="32"' + '> ' + "wind speed";
		legend.appendChild(div);
		  
		map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('legend'));
		setTimeout(function(){ 
			addDummyMarkers();
		}, 500);
	  }
	  function addDummyMarkers() {
	 /** var test = $.getJSON(
		"../video1.json", function(data) {
			console.log(data);
		}
	  );**/
	  //grab the jsons here
		var test = [
		video0,
		json
		].map(x => 
			new google.maps.Marker({
				icon:makeArrow(				
					getDirections(x),
					speedToColor(forceWindSpeed(x)),
					//"#0FFF00",
					true
				),
				position: force(x),
				map: map,
				title:"wind direction",
				animation: google.maps.Animation.DROP,
				}
			).addListener('click',
			function() {
			//--------------------------------------------------------------------play video
				$('#resultHolder').show();
				$("#speedContent").html(forceWindSpeed(x));
				$("#directionContent").html(getDirections(x));
				$('html, body').animate({
				scrollTop: $('#resultHolder').offset().top
				}, 1000);
			})	
		);
		console.log(test);
	  }
	  function getDirections(x) {
		  if(x.windDirection == null) return Math.floor(Math.random() * 360);
		  else return x.windDirection;
	  }
	  function forceWindSpeed(x) {
		  var checker = fWS(x);
		  if(Array.isArray(checker)) {
			  return average(checker);
		  }
		  else return checker;
	  }
	  function fWS(x) {
		  if(x.windSpeed != null) return x.windSpeed
		  if(x["windSpeed"] != null) return x["windSpeed"];
		  if(x.data != null) return x.data;
		  if(x["data"] != null) return x["data"];
	  }
	  let sum = (array) => array.reduce((a, b) => a + b);
	  let avg = (array) =>  sum(array) / array.length;
	  let average = (array) => Math.round(avg(array));
	  //standard deviation?
	  function force(x) {		  
		  return {
			  lat:parseFloat(lat(x)),
			  lng:parseFloat(longer(x))
		  };
	  }
	  function lat(x) {
		  if(x.latitude != null) return x.latitude;
		  if(x["latitude"] != null) return x["latitude"];
		  if(x.lat != null) return x.lat;
		  if(x["lat"] != null) return x["lat"];
		  console.log("problem with " +x );
	  }
	function longer(x) {
		if(x.longitude != null) return x.longitude;
		if(x["longitude"] != null) return x["longitude"];
		if(x["long"] != null) return x["long"];
		console.log("problem with " +x );
	}
	  function speedToColor(speed) {
	  var max = 157;
	  var min = 74;
		if(speed > max) speed = max;
		if(speed < min) speed = min;
		speed -= min;
		var r = (speed*(255/max)).toString(16).toUpperCase();
		if(r.length == 1) r = "0"+r;
		
		var g = ((max-speed)*(255/max)).toString(16).toUpperCase();
		if(g.length == 1) g = "0"+g;
		
		return "#" + r + g + "00";
	  }
		/**
       * The CenterControl adds a control to the map that recenters the map on
       * Chicago.
       * This constructor takes the control DIV as an argument.
       * @constructor
       */
      function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
		controlUI.className = "ControlContainer";
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
		controlText.className = "MyControl";

		controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);
		

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
			map.setCenter(myLatLng);
        });

      }
	  function makeMarker(position, title, rotation, color, clickable, width, height) {
		return {
          position	: position,
		  icon		: makeArrow(rotation, color, clickable, width, height),
          map		: map,
          title		: title,
		  animation	: google.maps.Animation.DROP,
        };
	  }
	  function makeArrow(rotation = 0, color = "black", clickable = true, width = 20, height = 32) {
		var paths = [
			"M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z",
		];
		return {
			path		: paths[0],
			scaledSize	: new google.maps.Size(width, height),
			origin		: new google.maps.Point(0, 0),
          	anchor		: new google.maps.Point(width/2, height/2),
			fillColor		:color,
			fillOpacity	: 100,
			rotation	: rotation - 90,
			strokeColor	: color
		};
	}
	function fun(i = 0) {
		setTimeout(function(){ 
		//console.log("hello");
			array.push(new google.maps.Marker(makeMarker(myLatLng, "wind direction", i, "#ff0000")));
			if(i < 360)fun(i += 360/16);
			else {
				array.map(e => e.setMap(null));
				array = [];
				fun(0);
			}
		}, 200);	
	}
	var video0 = {"name":"video1",
"url":"https://youtu.be/XGtCeieSBgY",
"lat":"26.024436",
"long":"-80.164521",
"data":[
40.767130439005435,
41.3127704607484,
66.82688492063492,
91.33333333333333,
91.65029761904762,
76.27827380952381,
80.07589285714285,
79.13244047619047,
76.10267857142857,
77.6875,
57.72023809523809,
76.35416666666667,
61.569940476190474,
65.81696428571429,
57.27529761904761,
78.22916666666667,
69.86160714285714,
87.47916666666667,
73.93154761904762,
56.410714285714285,
37.9375,
72.8125,
76.53571428571428,
78.70089285714286,
67.75094696969697,
63.70982142857143,
47.28125,
54.220238095238095,
0,
0,
0
]};
	var mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
];