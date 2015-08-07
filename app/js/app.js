'use strict';
/* global Modernizr */
/* global google */

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
            
			_userAgentInit();

			/*
			Custom JS
			*/

			// Quote background parallax
			// Window var
			var $w = $(window),
					wTop,
					wBottom;

			// Quote var
			var $q = $('#quote'),
					qTop = $q.offset().top,
					qBottom = qTop + $q.height();

			// Parallax section
			var $qBg = $('#quote-bg');

			// Air Balloon parallax
			var $a = $('#air-balloon-a'),
					$b = $('#air-balloon-b'),
					$c = $('#air-balloon-c'),
					$d = $('#air-balloon-d');

			// Detect desktop browser
			if(!Modernizr.touch) {

				// Parallax effect happen
				$w.scroll(function() {

					wTop = $w.scrollTop();
					wBottom = wTop + $w.height();

					// Check parallax section view
					if((wBottom >= qTop) && (wTop <= qBottom)) {
						// reduce position top of #quote-bg
						$qBg.css({
							transform: 'translateY(' + (qTop - wBottom)*0.1 + 'px)'
						});

					}

					var aCheckpoint = qBottom - 200;

					if((wBottom >= aCheckpoint) && (wTop <= qBottom)) {
						$a.css({
							transform: 'translateY(' + (aCheckpoint - wBottom)*0.3 + 'px)'
						});
						$b.css({
							transform: 'translateY(' + (aCheckpoint - wBottom)*0.4 + 'px)'
						});
						$c.css({
							transform: 'translateY(' + (aCheckpoint - wBottom)*0.8 + 'px)'
						});
						$d.css({
							transform: 'translateY(' + (aCheckpoint - wBottom)*0.4 + 'px)'
						});
					}

				});

			}

			// Filter portfolio
			$('#p-item-wrap').mixItUp();

			// Vertical mousewheel smooth scroll
			// var page = $('body');

			// $w.mousewheel(function(event, delta, deltaX, deltaY) {
			// 	if(delta < 0) {
			// 		page.scrollTop(page.scrollTop() + 30);
			// 	} else {
			// 		page.scrollTop(page.scrollTop() - 30);
			// 	}
			// 	return false;
			// });

			// Add rain effect for hero section
			// var heroBg = $('#hero-bg');
			// var heroWrap = $('.slider');

			// var engine = new RainyDay({
			// 	image: heroBg,
			// 	parentElement: heroBg,
			// 	blur: 3
			// });

			// engine.rain([[3, 2, 2]], 100);

			// var rain = function() {
			// 	var image = $('slider');

			// 	image.onload = function() {

			// 	};
			// };

			// rain();

			// Glogbal var
			var panorama;

			// Load Google map - Asynchronously way
			function initialize() {

				// Create array of styler
				var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#aee2e0"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#abce83"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]}];

				var styledMap = new google.maps.StyledMapType(styles, {name: 'Styled Map'});

				var location = new google.maps.LatLng(40.713287, -73.978343);

				var mapOptions = {
			    zoom: 16,
			    scrollwheel: false,
			    center: location,
			    mapTypeContronlOptions: {
			    	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			    }
			  };

				var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

				//Associate the styled map with the MapTypeId and set it to display.
			  map.mapTypes.set('map_style', styledMap);
			  map.setMapTypeId('map_style');

			  infowindow = new google.maps.InfoWindow();

			  // Custom map marker
			  var image = '../images/camera.svg';

			  var marker = new google.maps.Marker({
			    map: map,
			    icon: image,
			    // Define the place with a location, and a query string.
			    place: {
			      location: location,
			      query: 'Leslie Studio'
			    },
			    // Attributions help users find your site again.
			    attribution: {
			      source: 'Google Maps JavaScript API',
			      webUrl: 'https://developers.google.com/maps/'
			    }
			  });

			  // Info window content
			  var contentString = '<div id="content">'+
											      '<h1 id="firstHeading" class="firstHeading">Leslie Studio</h1>'+
											      '<div id="bodyContent">'+
											      '<p><b>Leslie</b> Lorem ipsum dolor sit amet. ' +
											      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, vitae? '+
											      'Lorem ipsum dolor sit amet, consectetur adipisicing.</p>'+
											      '<p class="work-hour">Work Hours: 08:00 - 17:00 (Mon - Fri)'+
											      '</div>'+
											      '</div>';

			  // Construct a new InfoWindow.
			  var infowindow = new google.maps.InfoWindow({
			    content: contentString,
			    maxWidth: 300
			  });

			  google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);			  	
			  });

			  // Set streetview
			  panorama = map.getStreetView();
			  panorama.setPosition(location);
			  panorama.setPov(/** @type {google.maps.StreetViewPov} */({
			  	heading: 265,
			  	pitch: 0
			  }));

			}

		  var streetViewBtn = document.getElementById('streetview-btn');

			function toggleStreetView() {

		  	var toggle = panorama.getVisible();

		  	if(toggle == false) {
		  		panorama.setVisible(true);
		  		streetViewBtn.innerHTML = 'Map View';
		  	} else {
		  		panorama.setVisible(false);
		  		streetViewBtn.innerHTML = 'Street View';
		  	}

		  }

		  streetViewBtn.onclick = toggleStreetView;

			google.maps.event.addDomListener(window, 'load', initialize);

			/*
			End Custom JS
			*/

		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();