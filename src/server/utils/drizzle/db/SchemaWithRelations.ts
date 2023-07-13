export * as drizzleSchema from './schema';
export * as drizzleRelations from './relations';

import * as drizzleSchema from './schema';
import * as drizzleRelations from './relations';

const drizzleSchemaWithRelations = {
	...drizzleSchema,
	...drizzleRelations,
};

export default drizzleSchemaWithRelations;

export type DrizzleSchemaWithRelations = typeof drizzleSchemaWithRelations;
