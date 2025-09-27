import { useAuthActions } from "@convex-dev/auth/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const NavBar = () => {
	const user = useQuery(api.auth.currentUser);
	const { signOut } = useAuthActions();
	const router = useNavigate();
	const counter = useQuery(api.counter.getDebate);
	console.log(counter, "COUNTER");

	return (
		<header className="sticky flex justify-between items-center top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4">
				<div className="flex items-center gap-3">
					<span className="font-semibold tracking-tight">
						<Link to="/">Prove Me Wrong</Link>
					</span>
					{!!counter && (
						<Badge
							variant="secondary"
							className="flex items-center gap-1.5 bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
						>
							<div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
							<span className="text-xs font-medium">
								{counter} want to be proved wrong
							</span>
						</Badge>
					)}
				</div>
				<div className="ml-auto flex items-center gap-2" />
			</div>
			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="p-0 h-auto">
							<Avatar className="h-8 w-8">
								<AvatarImage src={user?.image ?? ""} />
								<AvatarFallback>{user?.name?.split(" ")[0][0]}</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel>
							<div className="flex flex-col">
								<span className="font-medium leading-tight">{user?.name}</span>
								<span className="text-muted-foreground text-xs">
									{user?.email}
								</span>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link to="/" params={{}}>
									Dashboard
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link to="/recent" params={{}}>
									Recent
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								void signOut();
								router({
									to: "/auth",
								});
							}}
						>
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
