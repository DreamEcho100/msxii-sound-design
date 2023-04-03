import { TRPCError } from '@trpc/server';

import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

const FakeMerchesData = [
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/68dd/2d8c/939a3c915375659a0cb99d3f7132aeb4?Expires=1681084800&Signature=M1bl6ij8UVQiqTJE9VhrMQ9-xThNkfRakTAt~1JGPlDYNaeCzL5QInHIIJYSwMZBnOgUfw92X94zqyyHZnWjc0dLgI3ofQXgIO~xVdc5vSf9PNWOSdfbleaEDA9qzkZu22ZJ2sbUzF4GM8pA32eSquVhitcBSb6pSZszypYqEy2vanp3yCUYNaJW8OZAm2mwrQBgYuc3B1U7YJHEq0Md1AsBHLaOolbO82QLVA-83bf~Ok1DoScmeKCPlU6q7Fi653EvKV3dMHF9eWQylfWkWwdYickf1vdh-zc~moJB1yO8K4BGtUkuxNh81RJL30~bDbn4TKUdYPH6dYX6NgimFg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'bDbn4TKUdYPH6dYX6NgimFg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/4801/c8df/7a877126b9a120cb8d039984c8d2d845?Expires=1681084800&Signature=iQZ5K0XQtVa4Y-SAMwbrL~wux9IJj5ARfPoDhLFiSJrsEUlSTURCU01~XjfmdXbSAbJN6CR4zdMQspf3DHRJKBXmK05tawaayV-vBsR0yjmB9h1QUeM9mZHflVBC6h8LFBHDjBrs8Oa0riQ7xORU0WR3TPSHvPZxP-54mkAfj7p8e57Ws368hkuF812DTEIvxoRRiuBbIX8EMsvjBTiGwFYhpzItTGBJrHsXJtfB6iM7oWyIFn~afCQv66K6xx5kK24~nLWeV6TJse9D12T07CLHrhh7ifyPbhlD1G3dvyL3-hPdV6FwBGf8UJDuuGpE8UMu1Yzm2o-AHWA0AIKdBg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'AHWA0AIKdBg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/bf4f/0559/e2383db839b5671a883658e07e6b6703?Expires=1681084800&Signature=Alkjf1SBbFDV8Anx5KlB4McBX8qUccDhGvLed7LAn-4d2cw~iSyoVGshzL5Lmj5AbeMjE0sYdSdJy3pZUBRTbGpOtzi6J9oH8mORjLvGJ-031lof6SxoySyvheOFtZM0HlB701XKwARlSL3BwWizbxYQIe3I79Z3FFf-mqLBturonIKzudqqM8d-zIfFRBHctwULhI6VVh9Q5FGVW2RQqdmG1VIuecB04uToxGQckY8DaNJgQj3FTKZZo2eqoM4DAUIfkwCx1f7M9Y~XXcmJgXGzsuTPDLYUJhflCEDUBxga13jR8wXkSwpMz86cRfDGHQTkyCyI6svceC4-dvvj1w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'dvvj1w',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/a4ad/7988/988502e0ebc53de40a408a2650f2cf0d?Expires=1681084800&Signature=nO3zI6okT~H~VtO5GG2i41579mLADxV2NvgYHZrji-iKoHEuUm8LQGEgfMNkIR7UgoJrDjRtzsSurE2~s2-dPuPF2LX0t29HFemNVxIZjoQqVlssEBYseOFc0kTt9xW53wAIT-RrH4I8vYIgPoLgF5EiGfQl5JqXd6II0eZr30NHKlCvmRYXG4yZvP-4BLR6n-P8-EJ1Kw4qYvWm65EMyC87OF7yt8emvcIj-8wujrsEmU6kOOJLpuaU4FkCAKa3mBIsibt44Ztx-ueN-WuIId~mQT94wSzK6tsKl17M5miEwB~0KA5aPkmp8bu3s-rVSCiIW6qw6LQ4ZKyrK11QEg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'rVSCiIW6qw6LQ4ZKyrK11QEg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/4f2c/cb44/567482e4cef34ec007462b542c24259f?Expires=1681084800&Signature=lYFL9ri65i5LuTQKuMtocCnq7LjgHNRhlW--Pq1XPmOPLdTp8hCXxqbzBMlWCRcWSpccswsxJKkpzykvPtr3Gcm3lHG16SadFRWgeCyP0DM467i0UNH-L6kj--rThF-qp6irOlFmP49PS0lSlMwDQ~ABlSkVLK35WDehnMDvtToduUaEn4GscfNB0FXzX~B0os3LcbU54puCHbHeM5CKIyYYDbIyz5zuV2o9~sAY3NDz3UwPwz5ZptoKIaxCYbM9ZjtBC1FzqhjgtcgdHqiYiRYJXnoA-DBZ29hr4WPxBNp0GI9MXclD1uTMclubC8SDnbr0~xzhjW2UjIHj0CEnNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'xzhjW2UjIHj0CEnNA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/6fe6/ea8b/b2484751a116a22947e9600cb38957e5?Expires=1681084800&Signature=FBb2QdXYi1bInDW4LeIW3ECWMVR5OE9HuHkGfAisZw3XBgMDexk8fE0KaoKDicnGwYhlxNUge7CyPEMOZyw7q-LWbY4myyM2o3J4wz5FG4UTpweEaZGcZ4NAzil7o~EzR4dvo9uJIjeauN0IDxt6DtsMoqBLATMx5f4kLf4G9nmZt1gwpRJEr7e-U9A8o9dpDz8tcG-CjK2Hv7up2sBX37mcDBoAtgAZKR4inNeRXwfllr6ZmnWdhMCYu~mCFMyvGwVbpyyc5pVbA5Q1oDsRBmlOh0nroDVX94aHaPnel6vEZyWUwPJw8P6t2Y93UAPDk0~FrJ-511p9VBY39yCdiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: '511p9VBY39yCdiA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/fc37/19fe/59152b4ad037663890a6417e8be7ec80?Expires=1681084800&Signature=BizoY8q7dSxY74qtOQMwruu8aoCU7hKZJzg2cntRPpR3yAQ1Ehe7lnCXeN~AlRnQdwZT4dOgoWzR~sVT8BrBP92s4~UEzH8h3qhJccPQW4SxYazWmu0lisuvDmOH72q~matNNUaaP0CRkFhL3Xm5IozodOkQsdsTxZfNMmVp78wV~T03odqybRkAUh5mzM-Gn~7SZ3vKhhfPuxPtSdgoPOkynYDTMTM32sn7UDQAL1-VVarlSFcc-xWKS~m0x5vrfRqa5UXoh4husnJCKn~yU7CNIpei-PmQqUyrXqLMCkAC4i2JcuDrSboRWAkcp-vdh0xh~3U~aLHq-N1vMIQnzg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'N1vMIQnzg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/fba0/bc64/5988afc67faefd5722a6b15da0c47bd5?Expires=1681084800&Signature=qKGbj-868OA3uZYq89d60ctw-Dvo~Xm-TvqMizHDx-fyNlzG6a7MH9fqHliLirE5zfgiLsJRk9SR~VhC-vp0s8imZRkF3kM9GlxOs3BbVfxe3CX~Dqe-PlsXFEUWI2BUIcAa4f2ca6zZEbKnwjO0nx9xmCSnwEDV73WFT6nRuBHjPa9ITnYNM8toFtHWPd8MYbdC6G8pqo2d2FCWeUz1fSELpDPnryLjMLU2CAqElvL-g0Lu-Xb1A-v4hH4LgI2D2pPAeEnOQ1s5ZnmJCLVwRaa85CifkmIbdNZS-pGtR~oEgy-xruhj1uGTUiI~lBZBUk3OvRD9LSYo-Mu6xZiS3Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'Mu6xZiS3Q',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/88c5/ceff/ab468b7b01e14ad6034e953870aa6282?Expires=1681084800&Signature=man1DHR7rHji99mskgESLXEB3-mwWIPbH9aVOR41qBEBfbXgcPRqNnRUz06s3YDnvlPJH-5q8121hGXORCsIUG~C6WaPoP5ALq~VI0O~IOf1E4CO2xKK8~lFgm-8AgCoqXddjrC7mb80U2YvJTsOt2r3AT3OGx0~HEe9DpvxnWqQXltLuqQNd~uIurUuN4ylHYL21z7NkQyQzpsobAHRX5NqRvNRdLkJOo-4ULV3mvGRNMcAFpdfGOtFDaRPK797Xwa2FG5zmfgpZO3bONDe-ZYcIOcd5IPdh6XUui5b~6J5VSD-IufBzp3I5-BStW3werMe1qa6BOveDlx6BQQqyg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'BStW3werMe1qa6BOveDlx6BQQqyg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/a299/85b5/944f87a0b24107d63ddceb690a99d8f0?Expires=1681084800&Signature=Kfw~yVJ3redQKpRrqv6M0eXY4hvm5hD8RkzyzUt7BmEzXNGVzgcsMKigg0Wdmj0zy0RyS84f0IAFvgm~XsMQ1rYLlrkikLKf7FNR-F4snxmNCjxCSwfRdsuie7Ij5PbeeJ6ycJizAwbbxLmeRsuiQPgXWsQlSkiAqv1hOIoWuvudbuSxd8ZvN3FPhJn3~R5xHik6JaXszHy7nmqVxhJh6t94oMTOgjCjJ4fu2Sdbdj-raoaYkBHGOuvgySCMMFowOD~d7Bo9yqSEi4ZEzSnsc2SJ5YDEp4Ylcl9FhxFjZeoUU63EN7Rh8Kum~UXEZEQjjjMNitVERP2apHhN-1eiWw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: '1eiWw',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/72bd/de05/5896e513a3a730be05a0b7bb0ab8a641?Expires=1681084800&Signature=PZ3SNecB4GHwtIBZtmbti-Hhlzm1AINJVUmq91uRZaTIPTnSTNeGq77AnbRgCU5QxWZZT207ISotykdlHkLSfKtkxq6Zt1ew24b9TVf~9dbJC5fCOsolfILbUvwQVHTYLt9gD~OnGDjOPYiPwgB-jHFPM2u2r-o89iA1MRQvz0PGFSbq-7KNQ8HcQ2h5lVWhbLatpu1GSbtZBcUGcUKqNZWOp5JmlNzMj-r~mbapDLBKKiR~Eb1yQgBv8xka2SjVoYxbASU4IRljwBqjvfF~PTnleSyf2WM9aKow~U07AMyxwwxRvY89-2FBwMDCxaASHr4dBkawRHNzHT-F0hQOqg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'F0hQOqg',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/a97a/d3cb/3f39c91c9c1f4fbe0dcbbb197771fa43?Expires=1681084800&Signature=Y--K8gOJ0rj6r4mzHhag60GV6FwQ8PZdfDNt7rVUa4CbRcoikbfNZP0AxtzH6tFvYHeheBMi3oDohweMw5uv8mIaYcBvbAWP3~L8CkfPNdmqjVH~KYUQMblDsGFCE9ma5mMGi8iLQNne3wZGBSMRTiEoa-nxyGFsRsB2-ApMqLnVkP3seLzZkshheAZBwOdyqoog7aUJa2jGwDzCOAGEVb486R428zJsKpqfRIOluve24OdnWFs-xMR3M8kgNDEwu~2ChPvo3ebUB87RDQ3eU2fJZGgKbLG1XUupllPUTizFBqhlwHxhjYhmK0XLF~lM8M5J-ZCwA7DoKtDme6d1QA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
		handle: 'ZCwA7DoKtDme6d1QA',
		title: 'lorem ipsum',
		price: 100
	},
	{
		featured_image:
			'https://s3-alpha-sig.figma.com/img/3742/0f14/b0b485d2a89abe139ab1b5598567ddb1?Expires=1681084800&Signature=D2vxvVdoaY7mh~E-TzHvBSKT9LBHe0HJ~7XEj1LpTnc6daDqZ6Dsh2iVkMeI9ZEs0C4hi4D~2QO4n48eBQGqFa4PvbYz~Eb6d4Wlj5SAzanwFIkX1ZaaIuqpd5K~pjhS6Od6k3KcdJ5iesevYEg3C2unYV3Q0vpVkwLaU5wMLRtr4x9gMkB9Rawgw0o0K-duwA5duhW-uvCcN2kd2Wavn-LObS0LUXVNSBBHzD-U1Vmd80U6yP6uLssuu-igcAe0gdu3MmCiRfRj5Xtnm0m40y9QejOXRUt1R4ySou3gvgrDIQ1MCwFrWQHX51wGOQTjlFnHw74sTloPJCK~Lp4bFA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
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
