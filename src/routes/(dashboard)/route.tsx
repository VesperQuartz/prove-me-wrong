import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { Authenticated, useConvexAuth } from "convex/react";
import { NavBar } from "@/components/navbar";
import { PageLoader } from "@/components/page-loader";
import { Vapi } from "@/components/vapi";

export const Route = createFileRoute("/(dashboard)")({
	loader: async ({ context }) => {
		const data = await context.queryClient.ensureQueryData(
			convexQuery(api.auth.currentUser, {}),
		);
		console.log(data, "from loader");
	},
	pendingComponent: PageLoader,
	component: RouteComponent,
});

function RouteComponent() {
	const { isLoading: isPending, isAuthenticated } = useConvexAuth();
	const router = useNavigate();

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
				<Vapi />
			</div>
		</Authenticated>
	);
}
