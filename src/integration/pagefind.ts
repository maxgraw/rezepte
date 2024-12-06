import type { AstroIntegration } from "astro";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createIndex } from "pagefind";
import sirv from "sirv";

export default function pagefind(): AstroIntegration {
	let outDir: string;
	return {
		name: "pagefind",
		hooks: {
			"astro:config:setup": ({ config }) => {
				outDir = fileURLToPath(config.outDir);
			},
			"astro:server:setup": ({ server, logger }) => {
				if (!outDir) {
					logger.warn(
						"astro-pagefind couldn't reliably determine the output directory. Search assets will not be served.",
					);
					return;
				}

				const serve = sirv(outDir, {
					dev: true,
					etag: true,
				});
				server.middlewares.use((req, res, next) => {
					if (req.url?.startsWith("/pagefind/")) {
						serve(req, res, next);
					} else {
						next();
					}
				});
			},
			"astro:build:done": async ({ logger }) => {
				if (!outDir) {
					logger.warn(
						"astro-pagefind couldn't reliably determine the output directory. Search index will not be built.",
					);
					return;
				}

				const { index, errors: createErrors } = await createIndex({});
				if (!index) {
					logger.error("Pagefind failed to create index");
					for (const error of createErrors) {
						logger.error(error);
					}
					return;
				}
				const { page_count, errors: addErrors } = await index.addDirectory({
					path: outDir,
				});
				if (addErrors.length) {
					logger.error("Pagefind failed to index files");
					for (const error of addErrors) {
						logger.error(error);
					}
					return;
				}
				logger.info(`Pagefind indexed ${page_count} pages`);

				const { outputPath, errors: writeErrors } = await index.writeFiles({
					outputPath: path.join(outDir, "pagefind"),
				});
				if (writeErrors.length) {
					logger.error("Pagefind failed to write index");
					for (const error of writeErrors) {
						logger.error(error);
					}
					return;
				}
				logger.info(`Pagefind wrote index to ${outputPath}`);
			},
		},
	};
}
