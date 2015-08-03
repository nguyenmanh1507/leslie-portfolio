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

			// Detect browser unsupport css blend mode
			if(typeof window.getComputedStyle(document.body).backgroundBlendMode === 'undefined') {
			  document.documentElement.className += ' no-background-blend-mode';
			}

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