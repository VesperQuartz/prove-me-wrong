import { render } from "@react-email/components";
import { to } from "await-to-ts";
import type { Transporter } from "nodemailer";
import { SendVerificationEmail } from "@/components/mail";

interface IMailServer {
	sendVerificationEmail({
		recipient,
		tokenUrl,
	}: {
		recipient: string;
		tokenUrl: string;
	}): Promise<boolean>;
}

export class MailServer implements IMailServer {
	#transporter: Transporter;
	constructor(transporter: Transporter) {
		this.#transporter = transporter;
	}
	sendVerificationEmail = async ({
		recipient,
		tokenUrl,
	}: {
		recipient: string;
		tokenUrl: string;
	}): Promise<boolean> => {
		const [error, response] = await to(
			this.#transporter.sendMail({
				to: recipient,
				subject: "Email Verification",
				html: await render(SendVerificationEmail({ url: tokenUrl })),
			}),
		);
		if (error) {
			console.error("Failed to send verification email:", error);
			throw new Error(`Failed to send email: ${error.message}`);
		}
		return response;
	};
}
