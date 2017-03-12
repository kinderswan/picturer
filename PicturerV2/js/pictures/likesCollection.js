/* global define */
/* jshint esversion: 6 */
define([
	"jquery",
	"underscore",
	"backbone",
	"pictures/pictureModel",
	"json!shared/urlConfig.json",
	"shared/util"
], ($, // eslint-disable-line max-params
    _,
    Backbone,
    PictureModel,
    urlConfig,
    Util) => {
	"use strict";

    /**
     * Pictures collection class.
     *
     * @class PictureCollection
     * @extends {Backbone.Collection}
     */
	class LikesCollection extends Backbone.Collection {

		constructor(options) {
			super(options);
			this.likedModelIds = [];
		}

		getLikes() {
			this.createGetLikesCall();
		}

		createGetLikesCall(success, error) {
			$.ajax({
				"type": "GET",
				"url": this.buildRequestUrl(),
				"crossDomain": true,
				"dataType": "json",
				"success": this.getLikesSuccess,
				"error": error,
				"beforeSend": this.addHttpHeaders,
				"context": this
			});
		}

		buildRequestUrl() {
			return `${Util.getPlatformUrl()}/api/picture/${Util.getCurrentUser()}`;
		}

		getLikesSuccess(data) {
			this.generateLikesCollection(data.Models);
		}

		generateLikesCollection(models) {
			_.each(models, (model) => {
				this.likedModelIds.push(model.Id);
			});
		}

		addHttpHeaders(xhr) {
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		}

		dispose() {
			this.likedModelIds = [];
			Backbone.dispose.call(this);
		}
    }

	return LikesCollection;
});