/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"backbone",
	"pictures/picturesView",
    "auth/authView"
], ($, Backbone, PicturesView, AuthView) => {
	"use strict";

    /**
     * Router
     *
     * @class Router
     * @extends {Backbone.Router}
     */
	class Router extends Backbone.Router {

        /**
         * Gets app routes.
         *
         * @returns {any} Default application routes
         *
         * @memberOf Router
         */
		routes() {
			return { "": "index" };
		}

        /**
         * Handler for index page.
         *
         * @returns {PicturesView} Bootstrap page.
         *
         * @memberOf Router
         */
		index() {
			$.ajax({
				"url": "http://10.143.12.99:1001/api/auth",
				"type": "GET",
				"success": function (data) {
					if (data == "") {
						new AuthView({ "el": "#mainDiv" });
					}
					else {
						new PicturesView({ "el": "#mainDiv",
							"user": data
						});
					}
				}
			});			
		}
    }

	return Router;
});