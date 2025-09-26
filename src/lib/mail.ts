import * as nodemailer from "nodemailer";
import { env } from "@/config/env";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: env.mailUser,
		pass: env.mailPass,
	},
});
