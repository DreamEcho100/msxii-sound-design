import { z } from 'zod';

export const createMdBoxSchema = {
	content: z.string().nonempty().min(3),
};
export const updateMdBoxSchema = {
	id: z.string().cuid(),
	content: z.string().nonempty().min(3),
};
