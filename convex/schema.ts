import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
	...authTables,
	arguments: defineTable({
		userId: v.id("users"),
		topic: v.optional(v.string()),
		summary: v.string(),
		status: v.optional(v.string()),
		improvements: v.optional(v.array(v.string())),
		weakPoints: v.optional(v.array(v.string())),
		upvote: v.optional(v.number()),
		downvote: v.optional(v.number()),
	}),
	vote: defineTable({
		argumentId: v.id("arguments"),
		upvoteType: v.union(v.literal("upvote"), v.literal("downvote")),
		userId: v.id("users"),
	}),
	comments: defineTable({
		argumentId: v.id("arguments"),
		userId: v.id("users"),
		text: v.string(),
	}),
});
