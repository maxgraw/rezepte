import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const recipes = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/data/recipes" }),
	schema: z.object({
		title: z.string(),
		people: z.optional(z.number()),
		tags: z.optional(z.array(z.string())),
		ingredients: z.union([
			z.array(
				z.object({
					title: z.string(),
					items: z.array(
						z.object({
							name: z.string(),
							amount: z.string().optional(),
						}),
					),
				}),
			),
			z.array(
				z.object({
					name: z.string(),
					amount: z.string().optional(),
				}),
			),
		]),
		steps: z.array(
			z.object({
				content: z.string(),
			}),
		),
	}),
});

export const collections = { recipes };
