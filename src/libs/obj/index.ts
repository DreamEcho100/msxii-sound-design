/**
 * Returns an object with the changes between two objects.
 *
 * @template Obj1 - The type of the first object to compare.
 * @template Obj2 - The type of the second object to compare.
 *
 * @param {Obj1} objToCompareTo - The first object to compare.
 * @param {Obj2} objToCompareWith - The second object to compare.
 *
 * @returns {Partial<Obj1>} An object with the changes between the two input objects.
 */
export const objChanges = <
	Obj1 extends Record<string, unknown>,
	Obj2 extends Record<string, unknown>,
>(
	objToCompareTo: Obj1,
	objToCompareWith: Obj2,
) => {
	const objWithChanges: Partial<Obj1> = {};

	let key: string;
	for (key in objToCompareWith) {
		if (objToCompareTo[key] !== objToCompareWith[key])
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			objWithChanges[key] = objToCompareWith[key];
	}

	return objWithChanges;
};

/**
 * Returns a new object with the specified keys omitted.
 *
 * @template Obj - The type of the object to omit keys from.
 * @template ObjKeys - The type of the keys to omit.
 *
 * @param {Obj} obj - The object to omit keys from.
 * @param {ObjKeys} keys - The keys to omit.
 *
 * @returns {Omit<Obj, ObjKeys[number]>} A new object with the specified keys omitted.
 */

export const omit = <Obj, ObjKeys extends (keyof Obj)[]>(
	obj: Obj,
	keys: ObjKeys,
): Omit<Obj, ObjKeys[number]> => {
	const objCopy = {
		...obj,
	} as Omit<Obj, ObjKeys[number]>;

	let key: string;
	for (key of keys as unknown as (ObjKeys[number] & string)[]) {
		delete objCopy[key as keyof typeof objCopy];
	}

	return objCopy;
};
