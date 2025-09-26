import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentArgumentsSkeleton() {
	return (
		<Card className="rounded-2xl shadow-sm">
			<CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
				<CardTitle className="text-base">Recent Arguments</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{Array.from({ length: 3 }).map(() => (
					<div
						key={crypto.randomUUID()}
						className="flex items-start justify-between gap-4"
					>
						<div className="space-y-2 flex-1">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-40" />
						</div>
						<Skeleton className="h-6 w-10 rounded-full" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export function LeaderboardSkeleton() {
	return (
		<Card className="rounded-2xl shadow-sm">
			<CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
				<CardTitle className="text-base">Leaderboard</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{Array.from({ length: 4 }).map(() => (
					<div
						key={crypto.randomUUID()}
						className="flex items-center justify-between"
					>
						<div className="flex items-center gap-3">
							<Skeleton className="h-6 w-6 rounded-full" />
							<Skeleton className="h-6 w-6 rounded-full" />
							<Skeleton className="h-4 w-24" />
						</div>
						<Skeleton className="h-4 w-8" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

export function MyArgumentsSkeleton() {
	return (
		<Card className="rounded-2xl shadow-sm">
			<CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
				<CardTitle className="text-base">My Arguments</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<Skeleton className="h-9 w-80 max-w-full" />
				{Array.from({ length: 2 }).map(() => (
					<div key={crypto.randomUUID()} className="rounded-xl border p-3">
						<Skeleton className="h-4 w-1/2" />
						<div className="mt-2 flex items-center gap-2">
							<Skeleton className="h-7 w-16" />
							<Skeleton className="h-7 w-24" />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
