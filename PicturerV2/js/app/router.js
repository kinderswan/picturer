/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"backbone",
	"pictures/picturesView",
	"auth/authView",
	"shared/util"
], ($, Backbone, PicturesView, AuthView, Util) => { // eslint-disable-line max-params
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
			if (Util.getCurrentUser()) {
				new PicturesView({ "el": "#mainDiv" });
			} else {
				this.navigate("", { "trigger": true });
			}
		}
    }

	return Router;
});