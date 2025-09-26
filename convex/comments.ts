import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addComment = mutation({
	args: {
		comment: v.string(),
		argumentId: v.id("arguments"),
		userId: v.id("users"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return;
		}
		return await ctx.db.insert("comments", {
			text: args.comment,
			argumentId: args.argumentId,
			userId: args.userId,
		});
	},
});

export const getComment = query({
	args: {
		argumentId: v.id("arguments"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return;
		}
		const comments = await ctx.db
			.query("comments")
			.filter((q) => q.eq(q.field("argumentId"), args.argumentId))
			.collect();
		return await Promise.all(
			comments.map(async (x) => ({
				...x,
				user: await ctx.db.get(x.userId),
			})),
		);
	},
});
