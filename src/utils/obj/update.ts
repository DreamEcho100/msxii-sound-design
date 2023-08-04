/**
 * Updates a nested property in an object or array using an array of keys.
 * @param {string} path - The path to the property to update, represented as a string with dot notation.
 * @param {unknown} item - The object or array to update.
 * @param {*} value - The new value to set for the property.
 * @returns {object | Array<unknown> | undefined} The updated object or array.
 * @throws {Error} If the path is invalid or the object or array is not structured as expected.
 */
export function newUpdatedByPathString<Item>(
	path: string,
	item: Item,
	value: unknown,
) {
	return newUpdatedByPathArray<Item>(path.split('.'), item, value);
}

/**
 * Updates a nested property in an object or array using an array of keys.
 * @param {(string | number)[]} path - The path to the property to update, represented as an array of keys.
 * @param {unknown} item - The object or array to update.
 * @param {* | ((value: *) => *)} value - The new value to set for the property.
 * @returns {object | Array<unknown>} The updated object or array.
 * @throws {Error} If the path is invalid or the object or array is not structured as expected.
 */
export function newUpdatedByPathArray<Item>(
	path: (string | number)[],
	item: Item,
	value: unknown,
): Item {
	if (!item || typeof item !== 'object') {
		throw new Error('Invalid item type.');
	}
	if (path.length === 0) return item as Item;

	const key = path.shift();

	if (typeof key === 'undefined') throw new Error('Key is empty.');

	if (Array.isArray(item)) {
		const index = typeof key === 'number' ? key : parseInt(key);

		if (Number.isNaN(index)) throw new Error('Invalid path.');

		return [
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			...item.slice(0, index),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			path.length === 0
				? typeof value === 'function'
					? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
					  // @ts-ignore
					  value(item[key])
					: value
				: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
				  // @ts-ignore
				  newUpdatedByPathArray(path, item[key], value),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			...item.slice(index + 1),
		] as Item;
	} else if (typeof item === 'object' && key in item) {
		return {
			...item,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			[key]:
				path.length === 0
					? typeof value === 'function'
						? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
						  // @ts-ignore
						  value(item[key])
						: value
					: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
					  // @ts-ignore
					  newUpdatedByPathArray(path, item[key], value),
		} as Item;
	}

	throw new Error('Undefined item type.');
}

/**
 * @param {unknown} item - The object or array to update.
 * @param {(string | number)[]} path - The path to the property to update, represented as an array of keys.
 * @returns {unknown} The updated object or array.
 * @throws {Error} If the path is invalid or the object or array is not structured as expected.
 */
export function getValueByPathArray<Value = unknown>(
	item: Record<string, unknown>,
	path: (string | number)[],
): Value {
	let value = item;

	for (const key of path) {
		const _key =
			Array.isArray(value) && typeof key !== 'number' ? parseInt(key) : key;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		value = value[_key];
	}

	return value as Value;
}
