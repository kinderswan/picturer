/* jshint esversion:6 */
define(["jquery", "cookiejs"], ($, Cookies) => {
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

		static setCurrentUser(user) {
			Cookies.set("CurrentUser", user);
		}

		static indexUrl() {
			return "http://10.143.12.99:1000/";
		}
	}

	return Util;
});