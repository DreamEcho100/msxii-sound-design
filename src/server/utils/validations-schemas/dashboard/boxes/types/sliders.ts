import { SlidesPerViewType } from '@prisma/client';
import { z } from 'zod';

export const createOneSliderSchema = {
	slidesPerViewType: z.nativeEnum(SlidesPerViewType),
};
export const updateOneSliderSchema = {
	id: z.string().cuid2(),
	slidesPerViewType: z.nativeEnum(SlidesPerViewType).optional(),
};
