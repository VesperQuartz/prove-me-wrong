import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	server: {
		allowedHosts: ["mrlectus.local"],
	},
	plugins: [
		// this is the plugin that enables path aliases
		tsConfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart(),
		netlify(),
		viteReact(),
	],
});

export default config;
