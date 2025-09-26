import { getAuthUserId } from "@convex-dev/auth/server";
import { httpRouter } from "convex/server";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
	method: "GET",
	path: "/hello",
	handler: httpAction(async (ctx, request) => {
		const user2 = await getAuthUserId(ctx);
		console.log("user2", user2);
		const user = ctx.runQuery(api.auth.currentUser);
		return Response.json(user);
	}),
});

export default http;
