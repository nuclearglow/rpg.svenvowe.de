import { SEARCH_AREA_LENGTH } from '$lib/constants.js';
import type { Post } from '$lib/types.js';

export const prerender = false;

export const actions = {
  search: async (event) => {
    const formData = await event.request.formData();
    const searchTerm = String(formData.get('search'));

    if (!searchTerm) {
      return { success: true, results: [] };
    }

    const response = await event.fetch('/api/posts');
    const posts: Post[] = await response.json();
    const searchRegex = new RegExp(searchTerm, 'gis');

    const results = posts.flatMap((post) => {
      const matches = [...post.content.matchAll(searchRegex)];

      if (matches.length > 0) {
        return {
          post,
          matches: matches.flatMap((match) => {
            if (!match.index || !match.input) {
              return [];
            }

            const beforeIndex = Math.max(0, match.index - SEARCH_AREA_LENGTH);

            const before = match.input.substring(
              beforeIndex,
              Math.min(match.index, beforeIndex + SEARCH_AREA_LENGTH),
            );

            const afterIndex = Math.min(
              match.input.length - SEARCH_AREA_LENGTH,
              match.index + match[0].length,
            );

            const after = match.input.substring(afterIndex, afterIndex + SEARCH_AREA_LENGTH + 1);

            return {
              match: match[0],
              before,
              after,
            };
          }),
        };
      }

      return [];
    });

    // TODO: return search terms
    return { success: true, searchTerm, missing: !searchTerm, results };
  },
};
