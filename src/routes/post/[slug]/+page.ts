import { getHash } from '$lib/utils.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const post = await import(`../../../posts/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata,
      xpHash: await getHash(post.metadata.title),
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
}
