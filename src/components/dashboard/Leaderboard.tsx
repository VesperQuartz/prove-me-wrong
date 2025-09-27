import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Leaderboard() {
	const leaderboard = useQuery(api.leaderboard.getLeaderboard);
	console.log("leaderboard", leaderboard);
	return (
		<Card className="border-muted/50 rounded-2xl shadow-sm">
			<CardHeader>
				<CardTitle className="text-base">Leaderboard</CardTitle>
			</CardHeader>
			<CardContent>
				<ol className="space-y-2">
					{leaderboard?.map((l, idx) => (
						<li
							key={l._id}
							className="flex items-center justify-between rounded-md px-2 py-1"
						>
							<div className="flex items-center gap-3">
								<span
									className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold"
									style={{
										background:
											idx === 0
												? "#FDE68A"
												: idx === 1
													? "#E5E7EB"
													: idx === 2
														? "#FCA5A5"
														: "hsl(var(--muted))",
										color: idx < 3 ? "#111827" : "hsl(var(--muted-foreground))",
									}}
								>
									{l.rank}
								</span>
								<Avatar className="h-6 w-6">
									<AvatarImage src={l.user?.image} />
									<AvatarFallback>
										{l.user?.name?.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<span className="font-medium">{l.user?.name}</span>
							</div>
							<span className="tabular-nums text-sm">{l.score}</span>
						</li>
					))}
				</ol>
			</CardContent>
		</Card>
	);
}

export default Leaderboard;
