// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/libs/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["swiper"],
  },

  // /**
  //  * If you have the "experimental: { appDir: true }" setting enabled, then you
  //  * must comment the below `i18n` config out.
  //  *
  //  * @see https://github.com/vercel/next.js/issues/41980
  //  */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  images: {
    domains: [
      "cdn.shopify.com",
      "res.cloudinary.com",
      "www.msxaudio.com",
      "api.dicebear.com",
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: !process.env.IS_LOCAL_ENV,
  },
  eslint: {
    ignoreDuringBuilds: !process.env.IS_LOCAL_ENV,
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
export default config;
