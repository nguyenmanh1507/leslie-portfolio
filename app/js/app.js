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

			// Flickr API
			var fr = $('.flickr');
			var modal = $('.modal-wrap');
			var modalContent = $('#modal-content');
			var modalImg = $('.modal__img');
			var oldScr = modalImg.prop('src');	

			fr.on('click', function(e) {

				e.preventDefault();

				var src, href, w, h;
				var photoId = $(this).data('photo-id');
				var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&jsoncallback=?';
				var options = {
					api_key: '443237a89d7a051f84da874720971f26',
					photo_id: photoId,
					format: 'json'
				};
				var getFlickrPhotos = function(data, status) {
					src = data.sizes.size[6].source;
					w = data.sizes.size[6].width;
					h = data.sizes.size[6].height;
					href = 'https://www.flickr.com/photos/100956874@N08/' + photoId;
					// modalContentHTML += '<img class="modal__img" src="' + src + '">';
					// modalContent.html(modalContentHTML);
					modalImg.prop('src', src);
					$('.modal__link').prop('href', href);
				};

				$.getJSON(url, options, getFlickrPhotos);

				// Show Modal windown
				modal.fadeIn('fast');
				$('body').addClass('no-scroll');

			});

			// Close Modal windown
			$('.modal__close').on('click', function() {
				modal.fadeOut('fast');
				modalImg.prop('src', oldScr);
				$('body').removeClass('no-scroll');
			});

			// Validate form using angular
			angular.module('leslie', [])
				.controller('contactForm', function($scope) {

					$scope.name = undefined;
					$scope.email = undefined;
					$scope.message = undefined;

					var $form = $('.contact');
					var $contactTitle = $('.contact-title');

					$scope.sendForm = function() {
						$.ajax({
							url: '//formspree.io/nguyenmanh1507@gmail.com',
							method: 'POST',
							data: {
								name: $scope.name,
								email: $scope.email,
								message: $scope.message
							},
							dataType: 'json',
							beforeSend: function() {
								$form.addClass('is-loading');
								console.log('sending...');
							},
							complete: function() {
								$form.removeClass('is-loading').addClass('is-send-success');
								$contactTitle.text('Thank you! I\'ll contact you soon');
								console.log('send form success');
							}
						});
					};

				})
			;

			// Page smooth scroll
			
	
			// Glogbal var
			var panorama;

			// Load Google map - Asynchronously way
			function initialize() {

				// Create array of styler
				var styles = [{'featureType':'water','elementType':'geometry','stylers':[{'visibility':'on'},{'color':'#aee2e0'}]},{'featureType':'landscape','elementType':'geometry.fill','stylers':[{'color':'#abce83'}]},{'featureType':'poi','elementType':'geometry.fill','stylers':[{'color':'#769E72'}]},{'featureType':'poi','elementType':'labels.text.fill','stylers':[{'color':'#7B8758'}]},{'featureType':'poi','elementType':'labels.text.stroke','stylers':[{'color':'#EBF4A4'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'visibility':'simplified'},{'color':'#8dab68'}]},{'featureType':'road','elementType':'geometry.fill','stylers':[{'visibility':'simplified'}]},{'featureType':'road','elementType':'labels.text.fill','stylers':[{'color':'#5B5B3F'}]},{'featureType':'road','elementType':'labels.text.stroke','stylers':[{'color':'#ABCE83'}]},{'featureType':'road','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#A4C67D'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#9BBF72'}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#EBF4A4'}]},{'featureType':'transit','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'geometry.stroke','stylers':[{'visibility':'on'},{'color':'#87ae79'}]},{'featureType':'administrative','elementType':'geometry.fill','stylers':[{'color':'#7f2200'},{'visibility':'off'}]},{'featureType':'administrative','elementType':'labels.text.stroke','stylers':[{'color':'#ffffff'},{'visibility':'on'},{'weight':4.1}]},{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#495421'}]},{'featureType':'administrative.neighborhood','elementType':'labels','stylers':[{'visibility':'off'}]}];

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
			  var image = 'http://nguyenmanh1507.github.io/leslie-portfolio/dist/images/camera.svg';

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

		  	if(toggle === false) {
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