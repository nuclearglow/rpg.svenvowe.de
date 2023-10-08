import * as config from '$lib/config';
import type { Post } from '$lib/types';

export const prerender = true;

// provides /api/rss with all posts as Atom XML for RSS readers
export async function GET({ fetch }) {
  const response = await fetch('/api/posts');
  const posts: Post[] = await response.json();

  const headers = { 'Content-Type': 'application/xml' };

  const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${config.title}</title>
				<description>${config.description}</description>
				<link>${config.url}</link>
				<atom:link href="${config.url}/api/rss" rel="self" type="application/rss+xml"/>
				${posts
          .map(
            (post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${config.url}/${post.slug}</link>
							<guid isPermaLink="true">${config.url}/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`,
          )
          .join('')}
			</channel>
		</rss>
	`.trim();

  return new Response(xml, { headers });
}
