import { z } from 'zod';

export const CreateOneInlineStyleCssSchema = {
	gridTemplateColumns: z.string().nullable().optional(),
	gridTemplateRows: z.string().nullable().optional(),
};

export const UpdateOneInlineStyleCssSchema = {
	cssId: z.string().cuid2(),

	inlineStyles: z.object({
		gridTemplateColumns: z.string().nullable().optional(),
		gridTemplateRows: z.string().nullable().optional(),
	}),
};
