export const gqlImageText = 'id src url altText width height';

export const gqlPriceText = 'amount currencyCode';
export const gqlSEOText = 'title description';

// export const gqlMetafieldText =
// 	'createdAt description id key namespace type updatedAt value';

export const buildGQLArgsString = (argsMap: Record<string, unknown>) => {
	let argsString = '';

	let argKey: keyof typeof argsMap;
	for (argKey in argsMap) {
		const element = argsMap[argKey];

		if (element) {
			if (!argsString) {
				// eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
				argsString += `${argKey}: ${element}`;
				continue;
			}

			// eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
			argsString += `, ${argKey}: ${element}`;
		}
	}

	return argsString;
};
