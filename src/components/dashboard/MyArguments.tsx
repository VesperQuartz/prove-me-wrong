import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function MyArguments() {
	const user = useQuery(api.auth.currentUser);
	const [query, setQuery] = React.useState("");
	const [openIds, setOpenIds] = React.useState(new Set<string>());

	const argument = useQuery(api.arguments.getArguments, {
		userId: user?._id ?? "",
	});

	console.log("id", user?._id);

	return (
		<Card className="border-muted/50 rounded-2xl shadow-sm">
			<CardHeader>
				<CardTitle className="text-base">My Arguments</CardTitle>
				<CardDescription>Your recent submissions and drafts</CardDescription>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex items-center gap-2">
					<Input
						placeholder="Search my arguments..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						aria-label="Search my arguments"
					/>
				</div>
				{argument?.length === 0 && (
					<div className="text-muted-foreground text-sm">No results.</div>
				)}
				{argument?.map((arg) => {
					const isOpen = openIds.has(arg._id);
					return (
						<div key={arg._id} className="rounded-xl border bg-card/40">
							<div className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
								<div className="space-y-0.5">
									<div className="font-medium">{arg.topic}</div>
									<div className="text-muted-foreground text-xs capitalize">
										{arg.status} • {arg.improvements?.length} improvements
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button size="sm" variant="secondary">
										Open
									</Button>
									<Button
										size="sm"
										variant="ghost"
										onClick={() => {
											setOpenIds((prev) => {
												const next = new Set(prev);
												if (next.has(arg._id)) next.delete(arg._id);
												else next.add(arg._id);
												return next;
											});
										}}
									>
										{isOpen ? "Hide details" : "View details"}
									</Button>
								</div>
							</div>
							{isOpen && (
								<div className="border-t p-3">
									<div className="text-sm">
										<div className="mb-1 font-medium">Summary</div>
										<div className="text-muted-foreground">{arg.summary}</div>
									</div>
									<div className="mt-3 text-sm">
										<div className="mb-1 font-medium">Improvements</div>
										<ul className="list-disc space-y-1 pl-5 text-muted-foreground">
											{arg.improvements?.map((it) => (
												<li key={crypto.randomUUID()}>{it}</li>
											))}
										</ul>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}

export default MyArguments;
