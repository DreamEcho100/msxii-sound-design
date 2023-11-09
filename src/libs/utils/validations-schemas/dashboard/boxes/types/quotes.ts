import { z } from "zod";

export const createOneQuoteBxSchema = {
  content: z.string().min(3),
  cite: z.string().min(3),
};
export const updateOneQuoteBxSchema = {
  id: z.string().cuid2(),
  content: z.string().min(3).optional(),
  cite: z.string().min(3).optional(),
};
