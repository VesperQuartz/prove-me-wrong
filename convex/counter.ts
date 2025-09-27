import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { counter } from "./shared";

export const inDebate = mutation({
	args: {},
	handler: async (ctx) => {
		await counter.inc(ctx, "indebate");
	},
});

export const outDebate = mutation({
	args: {},
	handler: async (ctx) => {
		const count = await ctx.runQuery(api.counter.getDebate);
		if (count <= 0) return;
		await counter.dec(ctx, "indebate");
	},
});

export const getDebate = query({
	args: {},
	handler: async (ctx) => {
		return await counter.count(ctx, "indebate");
	},
});
