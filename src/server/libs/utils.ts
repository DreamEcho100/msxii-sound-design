import { z } from "zod";
import { env } from "~/libs/env.mjs";

export const allowedAdminEmails = z
  .array(z.string().email())
  .min(1)
  .parse(
    z
      .string()
      .nonempty()
      .parse(env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS_STRING)
      .split(","),
  );
