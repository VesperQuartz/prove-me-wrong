import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const currentUser = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		console.log("userId", userId);
		if (userId === null) {
			return null; // No user is authenticated
		}
		return await ctx.db.get(userId); // Returns Doc<"users"> or null
	},
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
	providers: [Google, GitHub],
});
