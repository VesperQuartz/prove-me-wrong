import { env } from "@/config/env";
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/repo/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.dbUrl,
  },
});
