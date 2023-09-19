import { z } from "zod";

export const allowedAdminEmails = z
  .array(z.string().email())
  .min(1)
  .parse(
    z
      .string()
      .nonempty()
      .parse(process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS_STRING)
      .split(","),
  );
