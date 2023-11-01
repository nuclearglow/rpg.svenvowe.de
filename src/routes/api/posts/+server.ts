import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getPosts() {
  // get from local fs
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  return Object.entries(paths)
    .flatMap(([path, file]) => {
      const slug = path.split('/').at(-1)?.replace('.md', '');

      if (file && typeof file === 'object' && 'metadata' in file && slug) {
        const metadata = file.metadata as Omit<Post, 'slug'>;

        let content = '';

        if (
          'default' in file &&
          file.default &&
          typeof file.default === 'object' &&
          'render' in file.default &&
          typeof file.default.render === 'function'
        ) {
          const contents = file.default.render();
          if (typeof contents === 'object' && 'html' in contents) {
            content = contents.html;
          }
        }
        const post = { ...metadata, content, slug } satisfies Post;
        return post;
      }

      return [];
    })
    .filter((post) => post && post?.published)
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
}

// provides /api/posts with all posts as JSON
export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
