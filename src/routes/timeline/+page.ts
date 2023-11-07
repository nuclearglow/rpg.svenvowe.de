import type { TimelineEvent } from '$lib/types';

export async function load({ fetch }) {
  const response = await fetch('api/events');
  const events: TimelineEvent[] = await response.json();
  return { events };
}
