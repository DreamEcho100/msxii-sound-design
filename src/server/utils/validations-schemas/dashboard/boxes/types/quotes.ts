import { z } from 'zod';

export const createOneQuoteBoxSchema = {
	content: z.string().min(3),
	cite: z.string().min(3),
};
export const updateOneQuoteBoxSchema = {
	id: z.string().cuid2(),
	content: z.string().min(3).optional(),
	cite: z.string().min(3).optional(),
};
