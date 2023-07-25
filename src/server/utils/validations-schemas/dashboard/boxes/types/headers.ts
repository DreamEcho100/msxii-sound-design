import { HeaderBoxHType } from '@prisma/client';
import { z } from 'zod';

export const createOneHeaderBoxSchema = {
	title: z.string().min(3),
	description: z.string().nullable().optional(),
	hType: z.nativeEnum(HeaderBoxHType).optional(),
};
export const updateOneHeaderBoxSchema = {
	id: z.string().cuid(),
	title: z.string().min(3).optional(),
	description: z.string().nullable().optional(),
	hType: z.nativeEnum(HeaderBoxHType).optional(),
};
