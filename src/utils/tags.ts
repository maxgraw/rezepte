type TagData = {
	original: string;
	lowercase: string;
	count: number;
};

type Recipe = {
	data: {
		tags?: string[];
	};
};

export const get_unique_tags = (recipes: Recipe[]): TagData[] => {
	return recipes
		.flatMap((recipe) => recipe.data.tags || [])
		.map((tag) => ({ original: tag, lowercase: tag.toLowerCase() }))
		.reduce<TagData[]>((count, tag) => {
			const tagKey = tag.lowercase;
			const existingTag = count.find((t) => t.lowercase === tagKey);
			if (!existingTag) {
				count.push({
					original: tag.original,
					lowercase: tag.lowercase,
					count: 1,
				});
			} else {
				existingTag.count += 1;
			}
			return count;
		}, []);
};
