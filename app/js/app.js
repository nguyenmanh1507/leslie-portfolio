'use strict';
/*global Modernizr */

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