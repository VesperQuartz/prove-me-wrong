import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const placeholder = new Array(12).fill(0).map((_, i) => ({
	Id: String(i + 1),
	title: `Argument #${i + 1}`,
	author: ["alex", "sarah", "mike"][i % 3],
	createdAt: `${(i % 5) + 1}d ago`,
	upvotes: Math.floor(Math.random() * 120),
}));

function RecentList() {
	const [query, setQuery] = useState("");
	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return placeholder;
		return placeholder.filter(
			(a) =>
				a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q),
		);
	}, [query]);
	const recent = useQuery(api.arguments.getAllArguments);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold tracking-tight">
					All Recent Arguments
				</h1>
				<Link to="/" className="text-sm text-primary hover:underline">
					Back to dashboard
				</Link>
			</div>
			<Card className="rounded-2xl shadow-sm">
				<CardHeader className="gap-3 bg-gradient-to-r from-primary/5 to-transparent">
					<CardTitle className="text-base">Latest</CardTitle>
					<div className="max-w-sm">
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search title or author..."
							aria-label="Search recent arguments"
						/>
					</div>
				</CardHeader>
				<CardContent className="divide-y">
					{recent?.length === 0 && (
						<div className="py-6 text-center text-sm text-muted-foreground">
							No matches.
						</div>
					)}
					{recent?.map((arg) => (
						<div
							key={arg._id}
							className="flex items-start justify-between gap-4 py-3 rounded-md px-2 hover:bg-muted/50 transition"
						>
							<div className="space-y-1">
								<div className="font-medium leading-snug">
									<Link
										to="/argument/$id"
										params={{ id: arg._id }}
										className="hover:underline"
									>
										{arg?.topic}
									</Link>
								</div>
								<div className="text-muted-foreground text-xs">
									by {arg.user?.name} •{" "}
									{formatDistanceToNow(new Date(arg._creationTime))} ago
								</div>
							</div>
							<div className="text-sm tabular-nums">▲ {arg?.upvote ?? 0}</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

export const Route = createFileRoute("/(dashboard)/recent")({
	component: RecentList,
});
