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

	class AuthModel extends Backbone.Model {
		constructor(options) {
			super(options);
			this.url = `${Util.getPlatformUrl()}/api/auth`;
		}

		defaults() {
			return {
				"Login": "",
				"Password": ""
			};
		}
		
		save(success, error, context) {
			$.ajax({
				"type": "POST",
				"url": this.url,
				"crossDomain": true,
				"data": this.toJSON(),
				"dataType": "json",
				"success": success,
				"error": error,
				"context": context
			});
		}

	}
	return AuthModel;
});
