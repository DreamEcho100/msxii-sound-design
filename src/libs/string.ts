export function splitByCamelCase(str: string) {
	return str
		.split(/([A-Z][^A-Z]+)/g)
		.join(' ')
		.trim();
}

// export function formatEventType(str: string) {
//   return str.replace(/[-.]|\d+$/g, " ").trimEnd();
// }

// export function camelCaseToALL_CAPS(str: string): string {
//   return splitByCamelCase(str)
//     .split(" ")
//     .map((w) => w.toUpperCase())
//     .join("_");
// }

// const arnums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
// export function arabicNumbers(str: string) {
//   return str.replace(/\d/g, (num: string) => arnums[parseInt(num)]);
// }
