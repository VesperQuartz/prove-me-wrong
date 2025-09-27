import { Link } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentArguments() {
	const recent = useQuery(api.arguments.getResentArguments);
	console.log("recent", recent);
	return (
		<Card className="border-muted/50 rounded-2xl shadow-sm">
			<CardHeader className="flex flex-row items-center justify-between gap-2">
				<CardTitle className="text-base">Recent Arguments</CardTitle>
				<Link
					to="/recent"
					className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/20"
				>
					See more
				</Link>
			</CardHeader>
			<CardContent className="divide-y">
				{recent?.length === 0 && (
					<div className="py-6 text-center text-sm text-muted-foreground">
						No arguments yet. Start a conversation to add one.
					</div>
				)}
				{recent?.map((arg) => (
					<div
						key={arg._id}
						className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0 rounded-md px-2 hover:bg-muted/50 transition"
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
								{formatDistance(new Date(arg._creationTime), new Date(), {
									addSuffix: true,
								})}
							</div>
						</div>
						<Badge className="rounded-full px-2" variant="secondary">
							▲ {arg.upvote ?? 0}
						</Badge>
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export default RecentArguments;
