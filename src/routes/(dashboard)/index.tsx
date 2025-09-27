import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { MyArguments } from "@/components/dashboard/MyArguments";
import { RecentArguments } from "@/components/dashboard/RecentArguments";
import {
	LeaderboardSkeleton,
	MyArgumentsSkeleton,
	RecentArgumentsSkeleton,
} from "@/components/dashboard/Skeletons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
	return (
		<div className="space-y-4">
			<div className="md:hidden">
				<Tabs defaultValue="recent" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="recent">Recent</TabsTrigger>
						<TabsTrigger value="leaders">Leaders</TabsTrigger>
						<TabsTrigger value="mine">Mine</TabsTrigger>
					</TabsList>
					<TabsContent value="recent">
						<RecentArguments />
					</TabsContent>
					<TabsContent value="leaders">
						<Leaderboard />
					</TabsContent>
					<TabsContent value="mine">
						<MyArguments />
					</TabsContent>
				</Tabs>
			</div>
			<div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
				<div className="md:col-span-2 lg:col-span-2">
					<Suspense fallback={<RecentArgumentsSkeleton />}>
						<RecentArguments />
					</Suspense>
				</div>
				<div className="md:col-span-1 lg:col-span-1">
					<Suspense fallback={<LeaderboardSkeleton />}>
						<Leaderboard />
					</Suspense>
				</div>
				<div className="md:col-span-3 lg:col-span-4">
					<Suspense fallback={<MyArgumentsSkeleton />}>
						<MyArguments />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/(dashboard)/")({
	component: Dashboard,
});
