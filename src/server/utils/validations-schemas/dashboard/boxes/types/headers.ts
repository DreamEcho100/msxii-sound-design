import { z } from 'zod';

export const createOneHeaderBoxSchema = {
	title: z.string().min(3),
	description: z.string().min(3).nullable().optional(),
};
export const updateOneHeaderBoxSchema = {
	id: z.string().cuid(),
	title: z.string().min(3).optional(),
	description: z.string().min(3).nullable().optional(),
};
