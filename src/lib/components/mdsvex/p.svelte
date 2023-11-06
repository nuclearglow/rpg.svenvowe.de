<script lang="ts">
  import { getHash, isHighlightedBySearchTerm } from '$lib/utils';
  import { onMount } from 'svelte';

  let data: HTMLParagraphElement;
  let id: string;
  let isHighlighted: boolean;

  onMount(async () => {
    const text = data.innerText.trim();

    id = await getHash(text);
    isHighlighted = isHighlightedBySearchTerm(id, text);
  });
</script>

<p bind:this={data} {id} class:highlight={isHighlighted}><slot /></p>
