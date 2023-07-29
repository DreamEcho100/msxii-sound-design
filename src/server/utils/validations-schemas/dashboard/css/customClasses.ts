import { z } from 'zod';

export const CreateOneCustomCssSchema = {
	customClasses: z.array(z.string()).nullable(),
};

export const UpdateOneCustomCssSchema = {
	cssId: z.string().cuid(),
	customClasses: z.array(z.string()).nullable(),
};
