import { TableAggregate } from "@convex-dev/aggregate";
import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const leaderboard = new TableAggregate<{
	Key: number;
	DataModel: DataModel;
	TableName: "leaderboard";
}>(components.leaderboard, {
	sortKey: (doc) => -doc.score,
});

export const addToLeaderboard = mutation({
	args: {
		score: v.number(),
		userId: v.id("users"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return;
		}
		const userBoard = await ctx.db
			.query("leaderboard")
			.filter((q) => q.eq(q.field("userId"), args.userId))
			.unique();
		if (!userBoard) {
			const id = await ctx.db.insert("leaderboard", {
				score: args.score,
				userId: args.userId,
			});
			const doc = await ctx.db.get(id);
			leaderboard.insert(ctx, doc!);
			return { message: "Added to leaderboard" };
		} else {
			const oldScore = await ctx.db.get(userBoard._id);
			await ctx.db.patch(userBoard._id, {
				score: userBoard.score + args.score,
			});
			const newScore = await ctx.db.get(userBoard._id);
			leaderboard.replace(ctx, oldScore!, newScore!);
			return { message: "Updated leaderboard" };
		}
	},
});

export const getLeaderboard = query({
	args: {},
	handler: async (ctx) => {
		const data = await ctx.db.query("leaderboard").collect();
		return await Promise.all(
			data.map(async (x) => ({
				...x,
				rank: await leaderboard.indexOf(ctx, x.score),
				user: await ctx.db.get(x.userId),
			})),
		);
	},
});
