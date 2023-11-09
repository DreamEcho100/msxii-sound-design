import { IframeBxTypes } from "@prisma/client";
import { z } from "zod";

export const createOneIframeBxSchema = {
  src: z.string().min(3),
  title: z.string().min(3).nullable().optional(),
  type: z.nativeEnum(IframeBxTypes).optional(),
};
export const updateOneIframeBxSchema = {
  id: z.string().cuid2(),
  src: z.string().min(3).optional(),
  title: z.string().min(3).nullable().optional(),
  type: z.nativeEnum(IframeBxTypes).optional(),
};
