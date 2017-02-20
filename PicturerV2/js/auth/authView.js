/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"underscore",
	"backbone",
	"auth/authModel",
	"text!auth/authTemplate.html"
], ($, // eslint-disable-line max-params
    _,
    Backbone,
    AuthModel,
	AuthTemplate) => {
	"use strict";

	class AuthView extends Backbone.View {

		constructor(options) {
			super(options);
			this.template = _.template(AuthTemplate);
			this.model = new AuthModel();
			this.render();
		}

		template() {
			return "";
		}

		model() {
			return AuthModel;
		}

		events() {
			return {
				"click .submitAuth": "submitAuth"
			};
		}

		render(){
			this.$el.html(this.template({}));
		}

		submitAuth(event) {
			event.preventDefault();
			const login = this.$("#login").val();
			const pass = this.$("#password").val();
			this.setAuthModelData(login, pass);
			this.model.save();
		}

		setAuthModelData(login, password){
			this.model.set({ 
				"Login": login,
				"Password": password
			 });
		}
    }

	return AuthView;
});