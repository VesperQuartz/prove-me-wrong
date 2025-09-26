import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute } from "@tanstack/react-router";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/(auth)/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	const { signIn } = useAuthActions();
	const handleGithubAuth = () => {
		signIn("github", {
			redirectTo: "/",
		});
	};

	const handleGoogleAuth = () => {
		console.log("Google authentication initiated");
		signIn("google", {
			redirectTo: "/",
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
			<Card className="w-full max-w-md shadow-2xl border-white/20 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
				<CardHeader className="text-center space-y-2">
					<CardTitle className="text-3xl font-bold text-balance bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
						Welcome Back
					</CardTitle>
					<CardDescription className="text-gray-600 dark:text-gray-300 text-pretty">
						Sign in to your account using your preferred method
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Button
						onClick={handleGithubAuth}
						size="lg"
						className="cursor-pointer w-full h-12 text-base font-medium bg-gray-900 hover:bg-gray-800 text-white border-0 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
					>
						<BsGithub />
						Continue with GitHub
					</Button>

					<Button
						onClick={handleGoogleAuth}
						size="lg"
						className="cursor-pointer w-full h-12 text-base font-medium bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
					>
						<FcGoogle />
						Continue with Google
					</Button>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t border-gradient-to-r from-purple-200 to-blue-200" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-white dark:bg-gray-900 px-3 text-gray-500 font-medium">
								Secure Authentication
							</span>
						</div>
					</div>

					<p className="text-xs text-center text-gray-500 dark:text-gray-400 text-pretty">
						By continuing, you agree to our Terms of Service and Privacy Policy.
						Your data is protected with industry-standard security.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
