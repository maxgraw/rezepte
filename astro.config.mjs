import pagefind from "./src/integration/pagefind";
import { defineConfig } from "astro/config";

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
