import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const blogRouter = createTRPCRouter({
	getMany: publicProcedure
		.input(
			z.object({
				cursor: z.number().nullish(),
				limit: z.number().max(100).optional().nullish()
			})
		)
		.query(({ input }) => {
			const cursor = input.cursor ?? 0;
			const limit = input.limit ?? 12;

			const items = fakeBlogPostsData.slice(cursor, cursor + limit + 1);

			let nextCursor: typeof cursor | undefined = undefined;
			if (items.length > limit) {
				const nextItem = items.pop();
				// nextCursor = nextItem!.myCursor;
				nextCursor = cursor + limit;
			}
			return {
				items,
				nextCursor
			};
		}),
	getAllSize: publicProcedure
		.input(
			z
				.object({
					limit: z.number().max(100).optional().nullish()
				})
				.optional()
		)
		.query(({ input }) => {
			const limit = input?.limit ?? 12;
			return Math.ceil(fakeBlogPostsData.length / limit);
		}),
	getOneById: publicProcedure.input(z.string()).query(({ input }) => {
		const product = fakeBlogPostsData.find((item) => item.id === input);

		if (!product) throw new TRPCError({ code: 'NOT_FOUND' });

		return product;
	})
});

const _fakeBlogPostsData = [
	{
		id: '1',
		image: {
			src: 'https://s3-alpha-sig.figma.com/img/9746/a2a2/8154b572e7116b29cfa0f7ee34c92cbc?Expires=1681084800&Signature=gSSvjhlLFKnZQAjlVemV-Is6Q0ew9tWqv4IROMuhbKpdeij6hdfWxXxZQZEE1g89hxqloI-30ON7~eqLqA-V4tI2okFvusDRwi0wKBDc0poALba7ZYyiRFcpzAW6bqHBn1KJrqqWjFOEZab6x8j47L6O4Vlu8NH5oCIdNBnbgdLFP4nK4ZL3XxgpLpzOA0T9M8gLZnDWsyMaeBTQQAApp11RY-G0yilUaYIbtSO8~vYZH-0uu9mjsX4-Bcv0JcuTN47DKv0DqKOlXCv2JnLl7kYmNf6adco8d8OJs5zeKeDL2raSeajpNw3cGM3LR0oABbnFdaFA7o1FvePIJ~eUzQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
		},
		title: 'TAPE SERIES VOL. 1 FROM MSXIISOUND AND AKAI PRO'
	},
	{
		id: '2',
		image: {
			src: 'https://s3-alpha-sig.figma.com/img/bf92/f612/5f6f26e6ff65a47e29c01f97b272aae9?Expires=1681084800&Signature=c3IV29~vRp2mUtCd6~2zviKw-PMYtj3XmWu8Cd4vDnsVBMQbD7ckBz9c4hka804TloOjNYRuDkq29sqL1xsGQcr1WWZ0aQvhMTBjtAZJ5uO6cxR7ccjaSj080ziGZm~ZnJdt3hEx1D386BolSL9hoo2r1ukOx8vFK6JhasT72w2tm9ujsi4py2bHqnjYmGL-T89UeoCH8abRjLiQrEQRYhfyOiAthVJsSUu~WaQjCWlvP-GtJ~FEGIqMZ2cwiK9~A4hdwNesZaX1JcduX3432nJnFA-K45NAPkaM0h1O82-NH1-A7JFXHftov~WCllewIdsxIbRSeg589AFXdjcfMw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
		},
		title: 'HOLIDAY JAMS BY THE WVGRD'
	},
	{
		id: '3',
		image: {
			src: 'https://s3-alpha-sig.figma.com/img/276c/3516/44a1d4b2eb39a3a3dab89058375ca3d9?Expires=1681084800&Signature=KPYyYnQ8wwX53zqG7NMre2obZcPqsHYmam-zDk0QH4UBAZpHAahlUU78Y6p2bFdqKHgM09Hf5jcqkyQcYJONqHGbeA26XUuJMiiMXHNcP~Qn2-gOlvdre-VjAXhANt-59TNdccuSSzwL2xilY8nLo8DNPEmweiwvXcZVriCQRtSavjs7VLbuOh9WAzRbJvCrzJ2AvaE1PpamVbqFK14ADcS94-L4VDVpuibvdDLlnBlLKurQMOc6RjnLv4td88nq-UEBfJWss~C2oIq5E-2QOKAYdfDXEZusGKHBspgFHw2FgtfCgPMivQ0UbvaGgPZXlPvn-cmm3xPOx7Nf~yNINw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
		},
		title: 'THE SOUND BUSINESS PRO - INTERVIEW WITH ALTRUWEST'
	},
	{
		id: '4',
		image: {
			src: 'https://s3-alpha-sig.figma.com/img/fac6/3fbc/3697a99a9e48a0fabe8c54fd4ee32212?Expires=1681084800&Signature=aFyBWq0~0x7uJGPxJq2jKZVGOCYLf8E1R5M-dS62M9SmfPMTNfJPzU92OTOkcD6vRtDXYd~dXmWXNl9obtCAoXTFBq756~idROB8LcnvDjyZHwcsPyQkeMZt~m3-enH6pxXIIpdzgsMmjUjWq-1oy4kfX3v1Bhw-FZG2PMrtuaT-47UcRkdN1fQQFMWZ6xklO6wUX5OaB-iTj6G1R~DrsZCKTQ2-S34mA3bAQlKI2NivEn2vZYM87Wgo77MqASQd-lUN7kIH~n1lMaNisAvhFzQWbDKbrWWLTcRA0VumQNKP6MtHy-LTPwGOMmoVfVLQWqjZD4MyUfd9xYudn0cQ0A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
		},
		title: '@MALO_BEATS ON THE MPC USING MSXII DRUMS AND SAMPLES'
	},
	{
		id: '5',
		image: {
			src: 'https://s3-alpha-sig.figma.com/img/7483/1ee9/2188d1806e165ff1eaab3bf72c95ab1c?Expires=1681084800&Signature=UFIQGgWzHCdUJPeqOaZgvdYMTfelCnNHfRF7VDV~xr8ibwiM0FvpRhUiYS60nB1l1sq8rW6gwKwyxODKAOszRP1vcFrbcXn2XP2QhpUlgY60b3NpMIxrNRUkLthIuadUN1lIqh3joNHe6hL9bgbfcHBXr7DY4z-qVC3CECZCbsBewDb81YfuJzFqoKJBSyf4x81wC9Lzcg49DpsecrzGKD9xsnXAEcyGkkKZg2QMmPu0YZR3-CS7UDeCmbuy34kUkkEeAmYQUW~Msa9ve9ru6~2xVZoq71VO-toHmcYAKSuHhEDqQRjAM02ktUdwuz-oo6c-OIKxHho82Yv-rS50lQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
		},
		title: 'INTRODUCING THE FREE FORM EXPANSION FROM MSXII & NATIVE INSTRUMENTS'
	},
	{
		id: '6',
		image: {
			src: 'https://s3-alpha-sig.figma.com/img/5b4f/fd09/98b6b0cdff2d2be7d450d6ba2001c66b?Expires=1681084800&Signature=I3cyG3An1rQEDNDpI5g~jSkGYqjawW-r-bNNKzce1BHsRVTTTQqCYl~L8Zc2MD5ib7JkBNtEjKRwHbEF09P9A4YmWgmUxCcTYtxqEc46r2PtnfUhKOUEzapclkS35-OV9cs-2~VZIvLdP81nD0-DLf1NAD4fBHKZQ-mOopSQvQWVQ5e1kPReWqR5ncOIytdj0dBK0dQqxdlpnHt5ffA-YdTqr8Vtz6myohNsX79XrYGDuST~jf68IHwLiW9X0sMdeDHTJsJOTeQv2~cEd7LE4Y-Ujk1daW2q9olTTATsBvIu4~CRU~y-z~LQyD7eWs0C8014GTI12YQNPNzPdcEkVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
		},
		title: 'MSIMP DROPS NEW "VIOOOOOBES" BEAT-TAPE'
	}
];

const fakeBlogPostsData = '_'
	.repeat(9)
	.split('_')
	.map((_, index) =>
		(index % 3 === 0
			? _fakeBlogPostsData
			: _fakeBlogPostsData.slice().reverse()
		).map((item) => ({
			...item,
			id: Math.random().toString(16)
		}))
	)
	.flat(1);
