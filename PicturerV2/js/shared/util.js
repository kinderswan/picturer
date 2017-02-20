/* jshint esversion:6 */
define([], () => {
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
	}

	return Util;
});