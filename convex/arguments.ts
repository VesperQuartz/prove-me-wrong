import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { leaderboard } from "./leaderboard";

export const getAllArguments = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return;
		}
		const data = await ctx.db.query("arguments").collect();
		return await Promise.all(
			data.map(async (x) => ({
				...x,
				user: await ctx.db.get(x.userId),
			})),
		);
	},
});

export const getResentArguments = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return;
		}
		const data = await ctx.db.query("arguments").take(4);
		return await Promise.all(
			data.map(async (x) => ({
				...x,
				user: await ctx.db.get(x.userId),
			})),
		);
	},
});

export const getArgumentById = query({
	args: {
		argumentId: v.id("arguments"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return;
		}
		const argument = await ctx.db.get(args.argumentId);
		const user = await ctx.db.get(argument?.userId!);
		return {
			...argument,
			user,
		};
	},
});

export const getArguments = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return;
		}
		return await ctx.db
			.query("arguments")
			.filter((q) => q.eq(q.field("userId"), args.userId))
			.collect();
	},
});

export const createArgument = mutation({
	args: {
		userId: v.id("users"),
		topic: v.optional(v.string()),
		summary: v.string(),
		status: v.optional(v.string()),
		improvements: v.optional(v.array(v.string())),
		weakPoints: v.optional(v.array(v.string())),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("arguments", {
			userId: args.userId,
			topic: args.topic,
			summary: args.summary,
			status: args.status,
			improvements: args.improvements,
			weakPoints: args.weakPoints,
		});
	},
});

export const upvote = mutation({
	args: {
		argumentId: v.id("arguments"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new ConvexError("Not authenticated");
		const check = await ctx.db
			.query("vote")
			.filter((q) => q.eq(q.field("userId"), userId))
			.filter((q) => q.eq(q.field("argumentId"), args.argumentId))
			.unique();
		if (check) return;
		const argument = await ctx.runQuery(api.arguments.getArgumentById, {
			argumentId: args.argumentId,
		});
		if (!argument?._id) throw new ConvexError("Argument not found");
		await Promise.all([
			ctx.db.patch(argument._id, {
				upvote: argument?.upvote ? argument?.upvote + 1 : 1,
			}),
			ctx.db.insert("vote", {
				argumentId: args.argumentId,
				upvoteType: "upvote",
				userId: userId,
			}),
		]);
		await ctx.runMutation(api.leaderboard.addToLeaderboard, {
			score: 1,
			userId: argument.user?._id!,
		});
		return { message: "Argument upvoted" };
	},
});

export const downvote = mutation({
	args: {
		argumentId: v.id("arguments"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) throw new ConvexError("Not authenticated");
		const check = await ctx.db
			.query("vote")
			.filter((q) => q.eq(q.field("userId"), userId))
			.filter((q) => q.eq(q.field("argumentId"), args.argumentId))
			.unique();
		if (check) return;
		const argument = await ctx.runQuery(api.arguments.getArgumentById, {
			argumentId: args.argumentId,
		});
		if (!argument?._id) throw new ConvexError("Argument not found");
		await Promise.all([
			ctx.db.patch(argument._id, {
				downvote: argument?.downvote ? argument?.downvote + 1 : 1,
			}),
			ctx.db.insert("vote", {
				argumentId: args.argumentId,
				upvoteType: "downvote",
				userId: userId,
			}),
		]);
		return { message: "Argument downvoted" };
	},
});
