/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"underscore",
	"backbone",
	"pictures/pictureModel",
	"text!pictures/pictureModelViewSmallTemplate.html",
	"text!pictures/pictureModelViewBigTemplate.html"
], ($, // eslint-disable-line max-params
    _,
    Backbone,
    PictureModel,
    PicturesModelViewSmallTemplate,
    PicturesModelViewBigTemplate) => {
	"use strict";

	class PictureModelView extends Backbone.View {
		constructor(options) {
			super(options);
			this.options = options || {};
			this.size = this.options.size;
			this.model = this.options.model;
			this.smallTemplate = _.template(PicturesModelViewSmallTemplate);
			this.bigTemplate = _.template(PicturesModelViewBigTemplate);
		}

		smallTemplate() {
			return "";
		}

		bigTemplate() {
			return "";
		}

		model() {
			return PictureModel;
		}

		$container() {
			return "";
		}

		events() {
			return { "click .like": "clickLike" };
		}

		render($container) {
			this.$container = $container;
			const size = this.model.get("displayingSize");
			const template = this.getRenderedTemplate(size);
			this.$container.append($(template));
		}

		getRenderedTemplate() {
			if (this.model.get("displayingSize") === "small") {
				return this.smallTemplate({
					"id": this.model.get("id"),
					"url": this.model.get("previewURL")
				});
			}
			return this.bigTemplate({
				"id": this.model.get("id"),
				"url": this.model.get("webformatURL"),
				"liked": this.model.get("isLiked")
			});
		}

		getResizedImageTemplate() {
			const size = this.model.get("displayingSize");
			if (size === "small") {
				this.model.set("displayingSize", "big");
			}

			if (size === "big") {
				this.model.set("displayingSize", "small");
			}

			return this.getRenderedTemplate();
		}

		resizeImage() {
			const $el = this.findModelOnPage();
			const $resized = $(this.getResizedImageTemplate());
			$el.replaceWith($resized);
		}

		clickLike() {
			if (this.model.get("isLiked") === false) {
				this.model.set({ "isLiked": true });
				this.model.save(this.makeLikeImageRed, null, this);
			} else {
				this.model.set({ "isLiked": false });
				this.model.destroy(this.makeLikeImageTransparent, null, this);
			}
		}

		findModelOnPage() {
			return $("#" + this.model.get("id"));
		}

		makeLikeImageRed() {
			const $el = this.findModelOnPage();
			$el.find("a.like").addClass("pressed");
		}

		makeLikeImageTransparent() {
			const $el = this.findModelOnPage();
			$el.find("a.like").removeClass("pressed");
		}
    }

	return PictureModelView;
});