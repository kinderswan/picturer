/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"underscore",
	"backbone"
], ($,
	_,
	Backbone) => {
	"use strict";

	class PictureModel extends Backbone.Model {
		constructor(options) {
			super(options);
			if (!options) {
				return;
			}
			this.set({ "previewURL": options.previewURL });
			this.set({ "webformatURL": options.webformatURL });
			this.url = "http://10.143.12.99:1001/api/picture";
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
				"url": "http://10.143.12.99:1001/api/picture",
				"crossDomain": true,
				"data": this.postLikedModel(),
				"dataType": "json",
				"success": success,
				"error": error,
				"context": context
			});
		}

		destroy(success, error, context) {
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
				"User": "MainUser5",
				"Liked": "true",
				"SearchKey": "MainUser5"
			};
		}

		destroyLikedModelLink() {
			const id = encodeURIComponent(this.get("id"));
			const user = encodeURIComponent("MainUser5");
			return `http://10.143.12.99:1001/api/picture/?searchKey=${user}&paramToDelete=${id}`;
		}
	}
	return PictureModel;
});
