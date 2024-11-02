import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const recipes = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/data/recipes" }),
	schema: z.object({
		title: z.string(),
		preparation: z.string(),
		cooking: z.string(),
		people: z.number(),
		ingredients: z.array(
			z.object({
				name: z.string(),
				amount: z.string().optional(),
			}),
		),
		steps: z.array(
			z.object({
				content: z.string(),
			}),
		),
	}),
});

export const collections = { recipes };
