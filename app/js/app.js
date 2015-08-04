'use strict';
/*global google */

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
			// var quoteOffset = $quote.offset().top;
			// var quoteOffsetBottom = quoteOffset + $quote.height();
			// var triggerPoint = quoteOffset - 100;
			// var $w = $(window);
			// var wHeight = $w.height();
			// var wOffsetTop;
			// var wOffsetBottom;
			// var topPos = 0;

			// $w.scroll(function() {

			// 	wOffsetTop = $w.scrollTop();
			// 	wOffsetBottom = wOffsetTop + wHeight;

			// 	if((wOffsetBottom > triggerPoint) && (wOffsetTop <= quoteOffsetBottom)) {
			// 		console.log('parallax effect');
			// 		topPos += 1;
			// 		$quoteBg.css({
			// 			top: (-1)*topPos +'px'
			// 		});
			// 	}
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