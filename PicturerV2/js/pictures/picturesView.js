/* global define*/
/* jshint esversion: 6 */
define([
	"jquery",
	"underscore",
	"backbone",
	"masonry",
	"pictures/pictureCollection",
	"text!pictures/picturesViewTemplate.html",
	"pictures/pictureModelView",
	"bridget"

], ($, // eslint-disable-line max-params
    _,
    Backbone,
    Masonry,
    PictureCollection,
    picturesViewTemplate,
    PictureModelView,
    bridget) => {
	"use strict";

	class PicturesView extends Backbone.View {
		template() {
			return "";
		}

		pictureImages() {
			return null;
		}

		$container() {
			return null;
		}

		events() {
			return { "click #searchImages, #loadMoreImages": "searchImages" };
		}

		constructor(options) {
			super(options);
			bridget("masonry", Masonry);
			this.template = _.template(picturesViewTemplate);
			this.collection = new PictureCollection();
			this.render();
			this.initializeCollectionEvents();
			this.pictureImages = [];
			this.renderMasonryGrid();
		}

		initializeCollectionEvents() {
			this.collection.on("ImagesAdded", this.renderSearchResults, this);
		}

		initializeMasonryEvents($container) {
			$container.on("click", ".image", (event) => {
				event.preventDefault();
				this.resizeImage(event);
			});
			$container.on("click", "a.like", (event) => {
				event.stopPropagation();
				this.clickLike(event);
			});
		}

		render() {
			this.$el.html(this.template({}));
			this.$("#loadMoreImages").addClass("hidden");
			this.initializeLoadMoreButtonEvents();
		}

		renderMasonryGrid() {
			this.$container = $(".img-container").masonry();
			this.$container.masonry({
				"isAnimated": true,
				"itemSelector": ".image"

			});

			this.initializeMasonryEvents(this.$container);

			return this.$container;
		}

		searchImages(event) {
			const searchQuery = $(".searchQueryInput").val();

			if (event && event.currentTarget.id === "loadMoreImages") {
				this.collection.search(searchQuery, true);
				return;
			}

			if (searchQuery.length > 0) {
				this.collection.search(searchQuery, false);
			}
		}

		renderSearchResults(event) {
			this.pictureImages = this.getPictures(event, "small");
			this.$container.empty();
			_.each(this.pictureImages, (image) => {
				image.render(this.$container);
			});
		}

		getPictures(collection, size) {
			const views = [];
			_.each(collection.models, (model) => {
				views.push(new PictureModelView({
					"model": model,
					"size": size
				}));
			});
			return views;
		}

		resizeImage(event) {
			const el = this.findImageModel(event.target.src);
			el.resizeImage();
		}

		clickLike(event) {
			const image = $(event.target).parents(".image").find("img")[0];
			const el = this.findImageModel(image.src);
			el.clickLike();
		}

		findImageModel(src) {
			return _.find(this.pictureImages, (image) => {
				const model = image.model.toJSON();
				return model.previewURL === src || model.webformatURL === src;
			});
		}

		initializeLoadMoreButtonEvents() {
			this.collection.on("ImagesFull", (needToHide) => {
				if (needToHide) {
					this.$("#loadMoreImages").addClass("hidden");
				} else {
					this.$("#loadMoreImages").removeClass("hidden");
				}
			});
		}
    }

	return PicturesView;
});