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
				"beforeSend": this.addHttpHeaders,
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
				"beforeSend": this.addHttpHeaders,
				"success": success,
				"error": error,
				"context": context
			});
		}

		postLikedModel() {
			return {
				"Id": this.get("id"),
				"User": Util.getCurrentUser().login,
				"Liked": "true",
				"SearchKey": Util.getCurrentUser().login
			};
		}

		destroyLikedModelLink() {
			const id = encodeURIComponent(this.get("id"));
			const user = encodeURIComponent(Util.getCurrentUser().login);
			return `${this.url}/?searchKey=${user}&paramToDelete=${id}`;
		}

		addHttpHeaders(xhr) {
			xhr.setRequestHeader("Login", Util.getCurrentUser().login);
			xhr.setRequestHeader("Password", Util.getCurrentUser().password);
		}
	}
	return PictureModel;
});
