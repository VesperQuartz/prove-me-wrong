import { createServerFn } from "@tanstack/react-start";
import { api } from "convex/_generated/api";
import { ConvexClient } from "convex/browser";

export const authFunction = createServerFn().handler(async () => {
	const convex = new ConvexClient(String(process.env.VITE_CONVEX_URL));
	const userId = await convex.query(api.auth.currentUser, {});
	console.log("userId-from-middleware", userId);
});
