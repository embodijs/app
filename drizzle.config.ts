import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/model/infrastructure/database/schema.ts',
	out: './migrations',
	migrations: {
		prefix: 'timestamp'
	},
	dbCredentials: {
		url: 'embodi.db'
	}
});
