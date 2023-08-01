import { z } from 'zod';

export const createOneImageBoxSchema = {
	src: z.string().min(3),
	altText: z.string().min(3).nullable().optional(),
	width: z.number().min(0).nullable().optional(),
	height: z.number().min(0).nullable().optional(),
};
export const updateOneImageBoxSchema = {
	id: z.string().cuid2(),
	src: z.string().min(3).optional(),
	altText: z.string().min(3).nullable().optional(),
	width: z.number().min(0).nullable().optional(),
	height: z.number().min(0).nullable().optional(),
};
