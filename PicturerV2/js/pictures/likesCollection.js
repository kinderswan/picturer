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

		getLikes() {
			this.createGetLikesCall();
		}

		createGetLikesCall(success, error, context) {
			$.ajax({
				"type": "GET",
				"url": this.buildRequestUrl(),
				"crossDomain": true,
				"dataType": "json",
				"success": this.getLikesSuccess,
				"error": error,
				"context": this,
				"beforeSend": this.addHttpHeaders
			});
		}

		buildRequestUrl() {
			return `${Util.getPlatformUrl()}/api/picture/${Util.getCurrentUser().login}`;
		}

		getLikesSuccess(data) {
			this.generateLikesCollection(data.Models);
		}

		generateLikesCollection(models) {
			this.likedModelIds = [];
			_.each(models, (model) => {
				this.likedModelIds.push(model.Id);
			});
		}

		addHttpHeaders(xhr) {
			xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
		}
    }

	return LikesCollection;
});