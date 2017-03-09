/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"backbone",
	"pictures/picturesView",
	"auth/authView",
	"shared/util"
], ($, Backbone, PicturesView, AuthView, Util) => {
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
			return {
				"": "index",
				"home": "home"
			};
		}

        /**
         * Handler for index page.
         *
         * @returns {PicturesView} Bootstrap page.
         *
         * @memberOf Router
         */
		index() {
			if (Util.getCurrentUser()) {
				this.navigate("home", { "trigger":true });
			} else {
				new AuthView({ "el": "#mainDiv" });
			}
		}

		home() {
			if (!Util.getCurrentUser()) {
				this.navigate("", { "trigger": true });
			} else {
				new PicturesView({ "el": "#mainDiv" });
			}
		}
    }

	return Router;
});