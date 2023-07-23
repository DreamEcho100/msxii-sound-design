import { z } from 'zod';

export const createMdBoxSchema = {
	content: z.string().nonempty(),
};
export const updateMdBoxSchema = {
	id: z.string().cuid(),
	content: z.string().nonempty(),
};
