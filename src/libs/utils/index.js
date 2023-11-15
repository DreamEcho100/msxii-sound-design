// import { env } from "~/env.mjs";

import { env } from "../env.mjs";

// export function getBaseUrl() {
//   if (typeof window !== "undefined") return ""; // browser should use relative url
//   if (process.env.VERCEL_URL) return process.env.VERCEL_URL; // SSR should use vercel url

//   return `http://localhost:${process.env.PORT}`; // dev SSR should use localhost
// }

export function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${env.PORT ?? 3000}`; // dev SSR should use localhost
}
