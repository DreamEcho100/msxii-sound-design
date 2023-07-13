import { drizzle } from 'drizzle-orm/neon-serverless';
import postgres from 'postgres';
import { env } from 'process';
import drizzleSchemaWithRelations from './SchemaWithRelations';
import { z } from 'zod';

const pool = postgres(z.string().nonempty().parse(process.env.DATABASE_URL));

const drizzleQueryClient = drizzle(pool, {
	schema: drizzleSchemaWithRelations,
	logger: env.NODE_ENV === 'development',
});

export default drizzleQueryClient;

const test = await drizzleQueryClient.query.customPage.findMany({
	with: {
		css: true,
		sections: {
			with: {
				css: true,
				body: {
					with: {
						headerBox: true,
						mdBox: true,
						imageBox: true,
						iframeBox: true,
						quoteBox: true,
						//

						tabsContainerBox: true,
						sliderBox: true,
						gridBox: true,
					},
				},
			},
		},
	},
});

console.log('test', test);
