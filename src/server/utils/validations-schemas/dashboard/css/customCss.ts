import { z } from 'zod';

export const CreateOneCustomCssSchema = {
	customCss: z.array(z.string()).nullable(),
};

export const UpdateOneCustomCssSchema = {
	cssId: z.string().cuid(),
	customCss: z.array(z.string()).nullable(),
};
