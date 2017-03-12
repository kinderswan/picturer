/* jshint esversion:6 */
define(["jquery", "cookiejs", "sha1"], ($, Cookies, sha1) => {
	class Util {
		/**
		 * Wraps something to array
		 *
		 * @param {any} something Array or object
		 *
		 * @returns {any[]} Something as a member of array
		 *
		 * @memberOf PictureCollection
		 */
		static wrapToArray(something) {
			if (Array.isArray(something)) {
				return something;
			}
			return [something];
		}

		static getPlatformUrl() {
			return "http://10.143.12.99:1001";
		}

		static getCurrentUser() {
			return Cookies.getJSON("CurrentUser");
		}

		static setCurrentUser(preHash) {
			const userHash = sha1(preHash);
			Cookies.set("CurrentUser", userHash);
		}

		static indexUrl() {
			return "http://10.143.12.99:1000/";
		}
	}

	return Util;
});