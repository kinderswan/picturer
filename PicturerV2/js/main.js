// Require.js allows us to configure shortcut alias
/* jshint esversion: 6 */
require.config({
	"paths": {
		"backbone": "../libs/backbone",
		"bridget":"../libs/jquery-bridget",
		"imagesLoaded": "../libs/imagesloaded.pkgd",
		"jquery": "../libs/jquery",
		"json": "../libs/json",
		"masonry": "../libs/masonry",
		"simplemodal": "../libs/jquery.simplemodal.1.4.4.min",
		"text": "../libs/text",
		"underscore": "../libs/underscore",
		"cookiejs": "../libs/js.cookie",
		"jszip": "../libs/jszip",
		"jszipUtils": "../libs/jszip-utils",
		"filesaver": "../libs/filesaver",
		"sha1": "../libs/sha1"
	},
	"shim": {
		"backbone": {
			"deps": [
				"underscore",
				"jquery"
			],
			"exports": "Backbone"
		},
		"imagesLoaded": {
			"deps": ["jquery"],
			"exports": "imagesLoaded"
		 },
		"masonry": {
			"deps": ["jquery"],
			"exports": "masonry"
		},
		"simplemodal": {
			"deps": ["jquery"],
			"exports": "modal"
		},
		"underscore": { "exports": "_" }
	}
});

require([
	"backbone",
	"pictures/picturesView",
	"app/router"
], (Backbone, PicturesView, Router) => {
	/* jshint nonew:false*/

	const router = new Router();
	Backbone.history.start();
	router.navigate("");
});
