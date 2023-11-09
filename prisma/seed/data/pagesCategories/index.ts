// import { createId } from '@paralleldrive/cuid2';

// NOTICE: The counter is set manually.
export const iosAppPgsPgCategory = {
  id: "j9tcino1tb4i6z51tpnjho9g",
  name: "ios-apps" as const,
  counter: 5,
  hasSubPgs: true,
  isPg: true,
};
export const aboutPgCategory = {
  id: "olr0j2np96eoydnmmt77vcxo",
  name: "about" as const,
  counter: 1,
  hasSubPgs: false,
  isPg: true,
};
export const supportPgCategory = {
  id: "r1s8ys9l2zxhukai30mnyx89",
  name: "support" as const,
  counter: 1,
  hasSubPgs: false,
  isPg: true,
};
export const policiesPgCategory = {
  id: "lnlog3gquw4s612c9ctypcq6",
  name: "policies" as const,
  counter: 1,
  hasSubPgs: true,
  isPg: true,
};
export const merchPgCategory = {
  id: "bkn7jft2ecnpt9ih8o05zpuv",
  name: "merch" as const,
  counter: 1,
  hasSubPgs: false,
  isPg: true,
};
export const blueLabelPgCategory = {
  id: "gymm72pshbbv47oezq4lm3sa",
  name: "blue-label" as const,
  counter: 1,
  hasSubPgs: false,
  isPg: true,
};
// export const productsPgCategory = {
// 	id: 'jxhw3jtc4opuu0eg4y7nb07l',
// 	name: 'products' as const,
// 	counter: 1,
// 	hasSubPgs: true,
// 	isPg: true,
// };

const pagesCategories = [
  ...new Set([
    iosAppPgsPgCategory,
    aboutPgCategory,
    supportPgCategory,
    policiesPgCategory,
    merchPgCategory,
    blueLabelPgCategory,
    // productsPgCategory,
  ]),
];

export default pagesCategories;

// ('merch-page');
// ('merch-page');
