/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"underscore",
	"backbone",
	"shared/util"
], ($,
	_,
	Backbone,
	Util) => {
	"use strict";

	class PictureModel extends Backbone.Model {
		constructor(options) {
			super(options);
			if (!options) {
				return;
			}
			this.set({ "previewURL": options.previewURL });
			this.set({ "webformatURL": options.webformatURL });
			this.url = `${Util.getPlatformUrl()}/api/picture`;
		}

		defaults() {
			return {
				"displayingSize": "small",
				"id": "",
				"previewURL": "",
				"webformatURL": "",
				"isLiked": false
			};
		}

		save(success, error, context) {
			$.ajax({
				"type": "POST",
				"url": this.url,
				"crossDomain": true,
				"data": this.postLikedModel(),
				"dataType": "json",
				"success": success,
				"error": error,
				"context": context
			});
		}

		destroyModel(success, error, context) {
			$.ajax({
				"type": "DELETE",
				"url": this.destroyLikedModelLink(),
				"crossDomain": true,
				"success": success,
				"error": error,
				"context": context
			});
		}

		postLikedModel() {
			return {
				"Id": this.get("id"),
				"UserHash": Util.getCurrentUser(),
				"Liked": "true"
			};
		}

		destroyLikedModelLink() {
			const id = encodeURIComponent(this.get("id"));
			const user = encodeURIComponent(Util.getCurrentUser());
			return `${this.url}/?searchKey=${user}&paramToDelete=${id}`;
		}
	}
	return PictureModel;
});
