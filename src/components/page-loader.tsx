import { cn } from "@/lib/utils";

interface PageLoaderProps {
	className?: string;
}

export function PageLoader({ className }: PageLoaderProps) {
	return (
		<div
			className={cn(
				"flex min-h-screen items-center justify-center bg-background",
				className,
			)}
		>
			<div className="flex flex-col items-center space-y-6">
				<div className="relative">
					<div className="flex items-center space-x-4">
						<div className="relative">
							<div className="h-12 w-12 rounded-full bg-primary/20 animate-pulse" />
							<div className="absolute inset-0 h-12 w-12 rounded-full bg-primary/40 animate-ping" />
						</div>

						<div className="flex items-center space-x-2">
							<div className="h-1 w-8 bg-muted animate-pulse" />
							<span className="text-sm font-medium text-muted-foreground animate-pulse">
								VS
							</span>
							<div className="h-1 w-8 bg-muted animate-pulse" />
						</div>

						<div className="relative">
							<div className="h-12 w-12 rounded-full bg-destructive/20 animate-pulse" />
							<div className="absolute inset-0 h-12 w-12 rounded-full bg-destructive/40 animate-ping" />
						</div>
					</div>

					<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1">
						<div
							className="h-2 w-2 rounded-full bg-primary animate-bounce"
							style={{ animationDelay: "0ms" }}
						/>
						<div
							className="h-2 w-2 rounded-full bg-primary animate-bounce"
							style={{ animationDelay: "150ms" }}
						/>
						<div
							className="h-2 w-2 rounded-full bg-primary animate-bounce"
							style={{ animationDelay: "300ms" }}
						/>
					</div>
				</div>

				<div className="text-center space-y-2">
					<h2 className="text-xl font-semibold tracking-tight">
						Prove Me Wrong
					</h2>
					<p className="text-sm text-muted-foreground animate-pulse">
						Preparing your debate...
					</p>
				</div>

				<div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
					<div
						className="h-full bg-primary rounded-full animate-pulse"
						style={{
							width: "60%",
							animation: "loading-bar 2s ease-in-out infinite",
						}}
					/>
				</div>
			</div>

			<style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 60%; }
          100% { width: 100%; }
        }
      `}</style>
		</div>
	);
}
