import { isMarkdownFile } from '$lib/guards';
import type { Post } from '$lib/types';
import { getHash, getSlug, stripTags } from '$lib/utils';
import { json } from '@sveltejs/kit';

function getPosts() {
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  return Object.entries(paths)
    .flatMap(([path, file]) => {
      if (!isMarkdownFile(file)) {
        return [];
      }

      const slug = getSlug(path, 'md');

      const metadata = file.metadata as Omit<Post, 'slug'>;

      const contents = file.default.render();
      const content = stripTags(contents.html);

      return { ...metadata, content, slug } satisfies Post;
    })
    .filter((post) => post?.published)
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
}

// provides /api/posts with all posts as JSON, adds the link to the XP page based on the hash of the title
export async function GET() {
  const posts = getPosts();
  const result = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      xpHash: await getHash(post.title),
    })),
  );

  return json(result);
}
