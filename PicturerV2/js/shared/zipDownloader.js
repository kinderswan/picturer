/* jshint esversion:6 */
define(["jszip", "jquery", "json!shared/urlConfig.json", "underscore", "jszipUtils", "filesaver"], (JSZip, $, urlConfig, _, JSZipUtils, FileSaver) => {
	class ZipDownloader {

		constructor() {
			this.fileURLs = [];
			this.zip = new JSZip();
		}

		getZippedArchive(ids) {
			const that = this;
			$.when(
				_.each(ids, (id) => {
					const url = that.getFullUrl(id);
					that.getPictureJpeg(url);
				}
			)).done($.proxy(this.proceedWithFileUrls, this));
			this.fileURLs = [];
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
			$.ajax({
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
						const zipFile = that.zip.generate({ "type": "blob", "compression" : "DEFLATE"});
						saveAs(zipFile, filename);
					}
				});
			});
		}
	}

	return ZipDownloader;
});