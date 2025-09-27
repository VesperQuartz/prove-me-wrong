import aggregate from "@convex-dev/aggregate/convex.config";
import shardedCounter from "@convex-dev/sharded-counter/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(shardedCounter, { name: "counter" });
app.use(aggregate, { name: "leaderboard" });

export default app;
