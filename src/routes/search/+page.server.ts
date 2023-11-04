import { SEARCH_AREA_LENGTH } from '$lib/constants.js';
import type { Post, SearchResponse } from '$lib/types.js';
import { redirect } from '@sveltejs/kit';

export const prerender = false;

export const actions = {
  search: async (event): Promise<SearchResponse> => {
    const formData = await event.request.formData();
    const searchTerm = String(formData.get('search'))?.trim();

    if (!searchTerm) {
      return { success: true, results: [] };
    } else if (searchTerm?.toLowerCase() === 'azekiel') {
      throw redirect(302, '/azekiel');
    }

    const searchRegex = new RegExp(searchTerm, 'gis');

    const response = await event.fetch('/api/posts');
    const posts: Post[] = await response.json();

    const results = posts.flatMap((post) => {
      const matches = [...post.content.matchAll(searchRegex)];

      if (!matches.length) {
        return [];
      }

      return {
        post,
        matches: matches.flatMap((matchArray) => {
          const [match] = matchArray;

          if (!match || !matchArray.index || !matchArray.input) {
            return [];
          }

          const beforeIndex = Math.max(0, matchArray.index - SEARCH_AREA_LENGTH);

          const before = matchArray.input.substring(
            beforeIndex,
            Math.min(matchArray.index, beforeIndex + SEARCH_AREA_LENGTH),
          );

          const afterIndex = Math.min(
            matchArray.input.length - SEARCH_AREA_LENGTH,
            matchArray.index + match.length,
          );

          const after = matchArray.input.substring(afterIndex, afterIndex + SEARCH_AREA_LENGTH + 1);

          return {
            before,
            match,
            after,
          };
        }),
      };
    });

    return { success: true, searchTerm, missing: !searchTerm, results };
  },
};
