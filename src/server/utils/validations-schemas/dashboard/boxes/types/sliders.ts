import { SlidersHolderSlidePerViewType } from '@prisma/client';
import { z } from 'zod';

export const createOneSliderBoxSchema = {
	slidesPerViewType: z.nativeEnum(SlidersHolderSlidePerViewType),
};
export const updateOneSliderBoxSchema = {
	id: z.string().cuid(),
	slidesPerViewType: z.nativeEnum(SlidersHolderSlidePerViewType).optional(),
};
