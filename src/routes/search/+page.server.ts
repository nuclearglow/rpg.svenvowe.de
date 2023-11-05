import type { Post, SearchResponse, SearchResult, SearchResultMatch } from '$lib/types';
import { getAllParagraphIndices, getHash, getParagraphIndices } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { SEARCH_AREA_LENGTH } from '$lib/constants';

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

    const results = (
      await Promise.all(
        posts.map(async (post) => {
          const searchMatches = [...post.content.matchAll(searchRegex)];

          if (!searchMatches.length) {
            return;
          }

          const paragraphs = getAllParagraphIndices(post.content);

          const matches = await Promise.all(
            searchMatches.flatMap(async (matchArray) => {
              const [match] = matchArray;

              if (!match || !matchArray.index || !matchArray.input) {
                return [];
              }

              const contentLength = matchArray.input.replace('\n\n', '').length;

              /**
               * retrieve the boundary indices for all paragraphs of the post, get the paragraph content and compute the hash
               */
              const [start = 0, end = 0] = getParagraphIndices(paragraphs, matchArray.index);
              const paragraph = post.content.substring(start, end).trim();
              const hash = await getHash(paragraph);

              /**
               * the before index is ideally SEARCH_AREA_LENGTH before the search match itself, but is capped at 0
               */
              const beforeIndex = Math.max(0, matchArray.index - SEARCH_AREA_LENGTH);

              const before = matchArray.input.substring(
                beforeIndex,
                Math.min(matchArray.index, beforeIndex + SEARCH_AREA_LENGTH),
              );

              /**
               * the after index is ideally SEARCH_AREA_LENGTH after the search match itself, but is capped at the end of the content
               */
              const afterIndex = Math.min(matchArray.index + match.length, contentLength - 1);

              const after = matchArray.input.substring(
                afterIndex,
                Math.min(afterIndex + SEARCH_AREA_LENGTH, contentLength - 1),
              );

              return {
                before,
                match,
                after,
                hash,
              } satisfies SearchResultMatch;
            }),
          );

          return {
            post,
            matches,
          };
        }),
      )
    ).filter(Boolean) as SearchResult[];

    return { success: true, searchTerm, missing: !searchTerm, results };
  },
};
