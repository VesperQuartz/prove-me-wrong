import { env } from "@/config/env";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/repo/schema";

const sql = neon(env.dbUrl);
export const db = drizzle({ client: sql, logger: true, schema });
