import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Leader = {
	Id: string;
	user: string;
	score: number;
};

const placeholder: Leader[] = [
	{ Id: "1", user: "sarah", score: 120 },
	{ Id: "2", user: "alex", score: 98 },
	{ Id: "3", user: "mike", score: 87 },
	{ Id: "4", user: "joy", score: 72 },
];

export function Leaderboard() {
	return (
		<Card id="leaderboard" className="border-muted/50 rounded-2xl shadow-sm">
			<CardHeader>
				<CardTitle className="text-base">Leaderboard</CardTitle>
			</CardHeader>
			<CardContent>
				<ol className="space-y-2">
					{placeholder.map((l, idx) => (
						<li
							key={l.Id}
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
									{idx + 1}
								</span>
								<Avatar className="h-6 w-6">
									<AvatarFallback>
										{l.user.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<span className="font-medium">{l.user}</span>
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
