import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { VapiWidget } from "@vapi-ai/client-sdk-react";
import to from "await-to-ts";
import { api } from "convex/_generated/api";
import { Authenticated, useConvexAuth } from "convex/react";
import ky from "ky";
import React from "react";
import { toast } from "sonner";
import { NavBar } from "@/components/navbar";
import { env } from "@/config/env";
import { assistantOptions } from "@/data/assistant";
import { checkAuth } from "@/middleware";

export const Route = createFileRoute("/(dashboard)")({
	ssr: false,
	component: RouteComponent,
	server: {
		middleware: [checkAuth],
	},
});

type Msg = {
	role: string;
	content: string;
};

function RouteComponent() {
	const { isLoading: isPending, isAuthenticated } = useConvexAuth();
	const { data: user, isLoading } = useSuspenseQuery(
		convexQuery(api.auth.currentUser, {}),
	);
	const router = useNavigate();
	const userId = user?._id;
	const firstName = user?.name?.split(" ")[0];
	const [transcript, setTranscript] = React.useState<Array<Msg> | undefined>(
		undefined,
	);
	console.log("hi");

	if (isPending) {
		return null;
	}

	if (!isAuthenticated) {
		router({
			to: "/auth",
			from: Route.fullPath,
			search: {
				redirect: location.href,
			},
		});
	}
	return (
		<Authenticated>
			<div className="relative flex min-h-svh flex-col">
				<div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
					<div className="absolute -top-28 -left-28 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute -bottom-28 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-400/10 blur-3xl" />
				</div>
				<NavBar />
				<main className="mx-auto w-full max-w-7xl flex-1 p-4">
					<Outlet />
				</main>
				{isLoading ? (
					<div>Loading</div>
				) : (
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
			</div>
		</Authenticated>
	);
}
