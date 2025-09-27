import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { formatDistance } from "date-fns";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function ArgumentDetails() {
	const { id } = useParams({ from: "/(dashboard)/argument/$id" });
	const [vote, setVote] = useState<"up" | "down" | null>(null);
	const comments = useQuery(api.comments.getComment, {
		argumentId: id as Id<"arguments">,
	});
	const addComment = useMutation(api.comments.addComment);
	const [text, setText] = useState("");
	const user = useQuery(api.auth.currentUser);
	const argument = useQuery(api.arguments.getArgumentById, {
		argumentId: id as Id<"arguments">,
	});

	const up = useMutation(api.arguments.upvote);
	const down = useMutation(api.arguments.downvote);
	const score = useMutation(api.leaderboard.addToLeaderboard);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Link to="/recent" className="hover:underline">
					Recent
				</Link>
				<span>/</span>
				<span>Argument {id}</span>
			</div>

			<Card className="rounded-2xl shadow-sm">
				<CardHeader>
					<CardTitle className="text-xl">{argument?.topic}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="text-muted-foreground text-sm">
						by {argument?.user?.name} •{" "}
						{formatDistance(
							new Date(argument?._creationTime ?? 0),
							new Date(),
							{ addSuffix: true },
						)}
					</div>
					<div className="leading-relaxed">{argument?.summary}</div>
					<div className="flex items-center gap-2">
						<Button
							className="rounded-full"
							variant={vote === "up" ? "default" : "secondary"}
							size="sm"
							onClick={async () => {
								await up({
									argumentId: id as Id<"arguments">,
								});
								// await score({
								// 	score: 1,
								// 	userId: argument?.user!._id!,
								// });
								setVote(vote === "up" ? null : "up");
							}}
						>
							▲ {argument?.upvote ?? 0}
						</Button>
						<Button
							className="rounded-full"
							variant={vote === "down" ? "default" : "secondary"}
							size="sm"
							onClick={async () => {
								await down({
									argumentId: id as Id<"arguments">,
								});
								setVote(vote === "down" ? null : "down");
							}}
						>
							▼ {argument?.downvote ?? 0}
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card className="rounded-2xl shadow-sm">
				<CardHeader>
					<CardTitle className="text-base">Comments</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-start gap-3">
						<Avatar className="h-8 w-8">
							<AvatarImage src={user?.image} />
							<AvatarFallback>{user?.name?.split(" ")[0][0]}</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-2">
							<Textarea
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder="Add a comment..."
							/>
							<div className="flex justify-end">
								<Button
									size="sm"
									disabled={!text.trim()}
									onClick={() => {
										addComment({
											comment: text,
											argumentId: id as Id<"arguments">,
											userId: user!._id,
										});
										setText("");
									}}
								>
									Post
								</Button>
							</div>
						</div>
					</div>
					<div className="divide-y">
						{comments?.map((c) => (
							<div key={c._id} className="flex items-start gap-3 py-3">
								<Avatar className="h-8 w-8">
									<AvatarImage src={c.user?.image} />
									<AvatarFallback>
										{c.user?.name?.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1">
									<div className="text-sm">
										<span className="font-medium">{c.user?.name}</span>{" "}
										<span className="text-muted-foreground">
											•{" "}
											{formatDistance(new Date(c._creationTime), new Date(), {
												addSuffix: true,
											})}{" "}
										</span>
									</div>
									<div className="text-sm leading-relaxed">{c.text}</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export const Route = createFileRoute("/(dashboard)/argument/$id")({
	component: ArgumentDetails,
});
