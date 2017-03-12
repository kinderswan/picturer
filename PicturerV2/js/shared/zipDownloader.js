/* jshint esversion:6 */
define(["jszip",
	"jquery",
	"json!shared/urlConfig.json",
	"underscore",
	"jszipUtils",
	"filesaver"], (JSZip, $, urlConfig, _, JSZipUtils, FileSaver) => { // eslint-disable-line max-params, no-unused-vars
	class ZipDownloader {

		constructor() {
			this.fileURLs = [];
			this.zip = null;
		}

		getZippedArchive(ids) {
			this.fileURLs = [];
			$.when.apply($, this.getDeferredsArchive(ids)).done($.proxy(this.proceedWithFileUrls, this));
		}

		getDeferredsArchive(ids) {
			const defArray = [];
			for (let i = 0; i < ids.length; i++) {
				const url = this.getFullUrl(ids[i]);
				const urlDef = this.getPictureJpeg(url);
				defArray.push(urlDef);
			}
			return defArray;
		}

		getFullUrl(searchId) {
			if (!searchId)
            {
				return "";
			}
			return `https://${urlConfig.name}/?` +
            `key=${urlConfig.queryParams.key}&id=${searchId}`;
		}

		getPictureJpeg(url) {
			if (!url) {
				return "";
			}
			return $.ajax({
				"type": "GET",
				"url": url,
				"crossDomain": true,
				"dataType": "jsonp",
				"success": this.getPictureSuccess,
				"context": this
			});
		}

		getPictureSuccess(data) {
			const url = data.hits[0].webformatURL;
			this.fileURLs.push(url);
		}

		proceedWithFileUrls() {
			this.zip = new JSZip();
			let count = 0;
			const that = this;
			this.fileURLs.forEach((url) => {
				const filename = "savedImages.zip";
				JSZipUtils.getBinaryContent(url, (err, data) => {
					if (err) {
						throw err; // or handle the error
					}
					that.zip.file(`${count}.jpg`, data, { "binary": true });
					count++;
					if (count === that.fileURLs.length) {
						const zipFile = that.zip.generate({
							"type": "blob",
							"compression" : "STORE"
						});
						saveAs(zipFile, filename);
					}
				});
			});
		}
	}

	return ZipDownloader;
});