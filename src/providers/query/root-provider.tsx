import { ConvexQueryClient } from "@convex-dev/react-query";
import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

export function getContext() {
	const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
	if (!CONVEX_URL) {
		console.error("missing envar VITE_CONVEX_URL");
	}
	const convexQueryClient = new ConvexQueryClient(CONVEX_URL);
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onError: (error) => {
				console.error(error, "FROM		C");
			},
		}),
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});

	convexQueryClient.connect(queryClient);
	return {
		queryClient,
		convexQueryClient,
	};
}
export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
