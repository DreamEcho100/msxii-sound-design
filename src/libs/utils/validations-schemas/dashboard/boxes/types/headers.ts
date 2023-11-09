import { HeaderBxHType } from "@prisma/client";
import { z } from "zod";

export const createOneHeaderBxSchema = {
  title: z.string().min(3),
  description: z.string().nullable().optional(),
  hType: z.nativeEnum(HeaderBxHType).optional(),
};
export const updateOneHeaderBxSchema = {
  id: z.string().cuid2(),
  title: z.string().min(3).optional(),
  description: z.string().nullable().optional(),
  hType: z.nativeEnum(HeaderBxHType).optional(),
};
