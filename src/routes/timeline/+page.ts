import type { TimelineEvent } from '$lib/types';

export const prerender = true;

export async function load({ fetch }) {
  const response = await fetch('api/events');
  const events: TimelineEvent[] = await response.json();
  return { events };
}
