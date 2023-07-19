/**
 * Updates a nested property in an object or array using an array of keys.
 * @param {string} path - The path to the property to update, represented as a string with dot notation.
 * @param {unknown} item - The object or array to update.
 * @param {*} value - The new value to set for the property.
 * @returns {object | Array<unknown> | undefined} The updated object or array.
 * @throws {Error} If the path is invalid or the object or array is not structured as expected.
 */
export function newUpdatedByPathString(path, item, value) {
	return newUpdatedByPathArray(path.split('.'), item, value);
}

/**
 * Updates a nested property in an object or array using an array of keys.
 * @param {string[]} path - The path to the property to update, represented as an array of keys.
 * @param {unknown} item - The object or array to update.
 * @param {*} value - The new value to set for the property.
 * @returns {object | Array<unknown> | undefined} The updated object or array.
 * @throws {Error} If the path is invalid or the object or array is not structured as expected.
 */
export function newUpdatedByPathArray(path, item, value) {
	if (!item || typeof item !== 'object') {
		throw new Error('Invalid item type.');
	}
	if (path.length === 0) return item;

	const key = path.shift();

	if (!key) {
		throw new Error('Key is empty.');
	}

	if (Array.isArray(item)) {
		const index = parseInt(key);

		if (!Number.isNaN(index)) throw new Error('Invalid path.');

		return [
			...item.slice(0, index),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			path.length === 0 ? value : newUpdatedByPathArray(path, item[key], value),
			...item.slice(index + 1),
		];
	} else if (typeof item === 'object' && key in item) {
		return {
			...item,
			[key]:
				path.length === 0
					? value
					: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
					  // @ts-ignore
					  newUpdatedByPathArray(path, item[key], value),
		};
	}
}
