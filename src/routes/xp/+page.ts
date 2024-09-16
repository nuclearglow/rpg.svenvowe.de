import type { XPEvent } from '$lib/types';
import { getHash } from '$lib/utils.js';

export const prerender = true;

export async function load({ fetch }) {
  const response = await fetch('api/xp');
  const xpEvent: XPEvent[] = await response.json();

  // patch in the hash for each event based on the title
  const result = await Promise.all(
    xpEvent.map(async (event) => ({
      ...event,
      hash: await getHash(event.title),
    })),
  );
  return { xpEvent: result };
}
