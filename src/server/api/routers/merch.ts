import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

const FakeMerchesData = [
	{
		featured_image: '/images/merch/1.png',
		handle: 'bDbn4TKUdYPH6dYX6NgimFg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/2.png',
		handle: 'AHWA0AIKdBg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/3.png',
		handle: 'dvvj1w',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/4.png',
		handle: 'rVSCiIW6qw6LQ4ZKyrK11QEg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/5.png',
		handle: 'xzhjW2UjIHj0CEnNA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/6.png',
		handle: '511p9VBY39yCdiA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/7.png',
		handle: 'N1vMIQnzg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/8.png',
		handle: 'Mu6xZiS3Q',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/9.png',
		handle: 'BStW3werMe1qa6BOveDlx6BQQqyg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/10.png',
		handle: '1eiWw',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/11.png',
		handle: 'F0hQOqg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/12.png',
		handle: 'ZCwA7DoKtDme6d1QA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/13.png',
		handle: 'Lp4bFA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/14.png',
		handle: 'Lp4bFA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/15.png',
		handle: 'Lp4bFA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image: '/images/merch/16.png',
		handle: 'Lp4bFA',
		title: 'lorem ipsum',
		price: 100
	}
];

export const merchRouter = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return FakeMerchesData;
	}),
	getOneByHandle: publicProcedure.input(z.string()).query(({ input }) => {
		const product = FakeMerchesData.find((item) => item.handle === input);

		if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

		return product;
	})
});
