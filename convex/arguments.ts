import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
