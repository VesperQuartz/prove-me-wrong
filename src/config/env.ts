import z from "zod/v4";

export const envSchema = z
	.object({
		dbUrl: z.string(),
		mailUser: z.string(),
		mailPass: z.string(),
		baseUrl: z.string(),
		webhookUrl: z.string(),
	})
	.readonly();

export const env = envSchema.parse({
	dbUrl: String(process.env.DB_URL),
	mailUser: String(process.env.MAIL_USER),
	mailPass: String(process.env.MAIL_PASS),
	baseUrl: String(import.meta.env.VITE_BASE_URL),
	webhookUrl: String(import.meta.env.VITE_HOOK_URL),
});
