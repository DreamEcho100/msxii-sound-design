import { z } from 'zod';

export const CreateCustomCssSchema = {
	customCss: z.array(z.string()).nullable(),
};

export const UpdateCustomCssSchema = {
	cssId: z.string().cuid(),
	customCss: z.array(z.string()).nullable(),
};
