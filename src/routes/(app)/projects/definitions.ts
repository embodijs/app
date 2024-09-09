import { TYPEID, valibotTypeId } from '$lib/typeid';
import * as v from 'valibot';

export const schema = v.object({
	id: v.pipe(v.string(), valibotTypeId(TYPEID.PROJECT)),
	refId: v.pipe(v.number(), v.integer()),
	name: v.pipe(v.string(), v.minLength(1)),
	displayName: v.pipe(v.string(), v.minLength(1)),
	url: v.pipe(v.string(), v.url()),
	branch: v.pipe(v.string(), v.minLength(1)),
	path: v.string()
});

// TODO: Currently (2021-10-06) the following code is not working drizzle-valibot seem to work only with valibot < 0.31.0
// https://github.com/drizzle-team/drizzle-orm/issues/2521
//createInsertSchema<InferInsertModel<typeof projects>>(projects);
