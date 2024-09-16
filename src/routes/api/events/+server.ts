import { isMarkdownFile } from '$lib/guards';
import type { TimelineEvent } from '$lib/types';
import { getSlug, stripTags } from '$lib/utils';
import { json } from '@sveltejs/kit';

async function getEvents() {
  const paths = import.meta.glob('/src/events/*.md', { eager: true });

  return Object.entries(paths)
    .flatMap(([path, file]) => {
      if (!isMarkdownFile(file)) {
        return [];
      }

      const slug = getSlug(path, 'md');

      const metadata = file.metadata as Omit<TimelineEvent, 'slug' | 'content'>;

      const contents = file.default.render();
      const content: TimelineEvent['content'] =
        stripTags(contents.html)
          .split('\n\n')
          .map((content) => content.trim())
          .filter(Boolean) ?? [];

      return { ...metadata, content, slug } satisfies TimelineEvent;
    })
    .filter((event) => event?.published)
    .sort((first, second) => Number.parseInt(second.date) - Number.parseInt(first.date));
}

// provides /api/events with all posts as JSON
export async function GET() {
  const events = await getEvents();
  return json(events);
}
