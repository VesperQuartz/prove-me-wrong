import { ConvexAuthProvider } from "@convex-dev/auth/react";
import {
	createRouter,
	parseSearchWith,
	stringifySearchWith,
} from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { parse, stringify } from "jsurl2";
import * as TanstackQuery from "@/providers/query/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanstackQuery.getContext();

	const router = createRouter({
		routeTree,
		parseSearch: parseSearchWith(parse),
		stringifySearch: stringifySearchWith(stringify),
		context: { ...rqContext },
		defaultPreload: "intent",
		Wrap: (props: { children: React.ReactNode }) => {
			return (
				<ConvexAuthProvider client={rqContext.convexQueryClient.convexClient}>
					{props.children}
				</ConvexAuthProvider>
			);
		},
	});

	setupRouterSsrQueryIntegration({
		router,
		// @ts-ignore
		queryClient: rqContext.queryClient,
	});
	return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
