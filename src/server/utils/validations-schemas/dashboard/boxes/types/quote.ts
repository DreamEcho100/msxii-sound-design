import { z } from 'zod';

export const createQuoteBoxSchema = {
	content: z.string().nonempty().min(3),
	cite: z.string().nonempty().min(3),
};
export const updateQuoteBoxSchema = {
	id: z.string().cuid(),
	content: z.string().nonempty().min(3).optional(),
	cite: z.string().nonempty().min(3).optional(),
};
