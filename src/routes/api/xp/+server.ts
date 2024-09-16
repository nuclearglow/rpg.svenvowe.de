import { isMarkdownFile } from '$lib/guards';
import type { TimelineEvent, XPEvent } from '$lib/types';
import { stripTags } from '$lib/utils';
import { json } from '@sveltejs/kit';

async function getXPEvents() {
  const paths = import.meta.glob('/src/xp/*.md', { eager: true });

  return Object.values(paths)
    .flatMap((file) => {
      if (!isMarkdownFile(file)) {
        return [];
      }

      const metadata = file.metadata as Omit<XPEvent, 'slug' | 'content'>;
      const contents = file.default.render();
      const content: TimelineEvent['content'] =
        stripTags(contents.html)
          .split('\n\n')
          .map((content) => content.trim())
          .filter(Boolean) ?? [];

      return { ...metadata, content } satisfies XPEvent;
    })
    .filter((event) => event?.published)
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
}

// provides /api/xp with all xp posts as JSON
export async function GET() {
  const xpEvents = await getXPEvents();
  return json(xpEvents);
}
