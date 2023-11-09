import { z } from "zod";

export const createOneMdBxSchema = {
  content: z.string().min(3),
};
export const updateOneMdBxSchema = {
  id: z.string().cuid2(),
  content: z.string().min(3),
};
