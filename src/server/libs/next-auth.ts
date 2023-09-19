import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type AuthOptions,
  type User,
} from "next-auth";

// import { env } from '~/libs/env.mjs';
import { db } from "~/server/libs/prisma";

// Credits to: https://github.com/nextauthjs/next-auth/tree/f1c6d62b2d194b69c8b588f1ce1456bd8be87396/packages/adapter-drizzle
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }
  interface AdapterUser extends User {
    id: string;
    email: string;
    emailVerified?: Date | null;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

// export type DrizzleClient = NeonDatabase<DrizzleSchema>;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: AuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}
