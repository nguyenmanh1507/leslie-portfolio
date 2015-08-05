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
			// var $quoteBg = $('#quote-bg');
			// var $quote = $('#quote');
			// var $balloonA = $('.air-balloon-a');
			// var quoteOffset = $quote.offset().top;
			// var quoteOffsetBottom = quoteOffset + $quote.height();
			// var triggerPoint = quoteOffset;
			// var $w = $(window);
			// var wHeight = $w.height();
			// var wOffsetTop;
			// var wOffsetBottom;
			// var topPos = 0;

			// // balloon position
			// var balloonAOffset = $balloonA.offset().top;
			// var balloonAOffsetBottom = balloonAOffset + $balloonA.height();

			// Parallax effect happen!
			// $w.scroll(function() {

			// 	wOffsetTop = $w.scrollTop();
			// 	wOffsetBottom = wOffsetTop + wHeight;

			// 	if((wOffsetBottom > triggerPoint) && (wOffsetTop <= quoteOffsetBottom)) {
			// 		console.log('parallax effect');
			// 		$quoteBg.css({
			// 			top: (quoteOffset - wOffsetBottom)*0.2 + 'px'
			// 		});
			// 	}

				// if((wOffsetBottom > (balloonAOffset - 100)) && (wOffsetTop <= balloonAOffsetBottom)) {
				// 	console.log(balloonAOffsetBottom);
				// 	$balloonA.css({
				// 		top: (balloonAOffset - wOffsetBottom)*0.4 + 'px'
				// 	});
				// }
			// });

			// Refactor parallax code
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