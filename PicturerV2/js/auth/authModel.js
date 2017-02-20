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

	class AuthModel extends Backbone.Model {
		constructor(options) {
			super(options);
			this.url = "http://10.143.12.99:1001/api/auth";
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
