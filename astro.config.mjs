import pagefind from "./src/integration/pagefind";
import { defineConfig } from "astro/config";
import path from "node:path";

const __dirname = import.meta.dirname;

// https://astro.build/config
export default defineConfig({
	build: {
		format: "file",
	},
	integrations: [pagefind()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		}
	}
});
