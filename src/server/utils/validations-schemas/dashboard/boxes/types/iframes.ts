import { IframeBoxTypes } from '@prisma/client';
import { z } from 'zod';

export const createOneIframeBoxSchema = {
	src: z.string().min(3),
	title: z.string().min(3).nullable().optional(),
	type: z.nativeEnum(IframeBoxTypes).optional(),
};
export const updateOneIframeBoxSchema = {
	id: z.string().cuid(),
	src: z.string().min(3).optional(),
	title: z.string().min(3).nullable().optional(),
	type: z.nativeEnum(IframeBoxTypes).optional(),
};
