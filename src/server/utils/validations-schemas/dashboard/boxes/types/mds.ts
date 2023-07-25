import { z } from 'zod';

export const createOneMdBoxSchema = {
	content: z.string().min(3),
};
export const updateOneMdBoxSchema = {
	id: z.string().cuid(),
	content: z.string().min(3),
};
