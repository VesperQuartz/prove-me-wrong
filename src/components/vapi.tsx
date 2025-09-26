"use client";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VapiWidget } from "@vapi-ai/client-sdk-react";
import to from "await-to-ts";
import { api } from "convex/_generated/api";
import ky from "ky";
import React from "react";
import { toast } from "sonner";
import { env } from "@/config/env";
import { assistantOptions } from "@/data/assistant";

type Msg = {
	role: string;
	content: string;
};

export const Vapi = () => {
	const { data: user, isLoading } = useSuspenseQuery(
		convexQuery(api.auth.currentUser, {}),
	);
	const userId = user?._id;
	const [hasDocument, setHasDocument] = React.useState(false);
	const firstName = user?.name?.split(" ")[0];
	const [transcript, setTranscript] = React.useState<Array<Msg> | undefined>(
		undefined,
	);
	React.useEffect(() => {
		if (window.document !== undefined) {
			setHasDocument(true);
		}
	}, []);
	if (isLoading) {
		return null;
	}
	console.log(hasDocument, "DOCUMENT");
	return (
		<>
			{hasDocument && (
				<VapiWidget
					publicKey="7f4928e6-1600-4543-82a7-17fee85dc6f5"
					mode="voice"
					size="tiny"
					assistantId="76a76ea4-4ed8-4520-b341-6c1ee4b575cd"
					onMessage={(message) => {
						console.log(message, ":::message-data:::");
						if (message.type === "conversation-update") {
							setTranscript(message.conversation);
						}
					}}
					onVoiceEnd={async () => {
						console.log("Call is ended!!!", transcript);
						if (transcript) {
							const data = transcript.filter(
								(trans) => trans.role !== "system",
							);
							const [error, response] = await to(
								ky.post(`${env.webhookUrl}`, {
									json: { transcript: data, userId },
								}),
							);
							if (error) {
								console.error("There was an error", error);
								toast.error(error.message);
							}
							console.log(await response.json());
							toast.success("Argument has ended");
						}
					}}
					assistantOverrides={{
						variableValues: {
							firstName,
							userId,
						},
					}}
					voiceShowTranscript={true}
					onError={(e) => {
						console.log("error", JSON.stringify(e, null, 2));
						// @ts-expect-error e
						const error = e?.error;
						if (error) {
							toast.error(error.errorMsg);
						} else {
							toast.error("Something went wrong. Please try again.");
						}
					}}
					assistant={assistantOptions({ firstName: firstName ?? "" })}
				/>
			)}
		</>
	);
};
