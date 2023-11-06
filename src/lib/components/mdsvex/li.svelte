<script lang="ts">
  import { getHash, isHighlightedBySearchTerm } from '$lib/utils';
  import { onMount } from 'svelte';

  let data: HTMLLIElement;
  let id: string;
  let isHighlighted: boolean;

  onMount(async () => {
    const text = data.innerText.trim();

    id = await getHash(text);
    isHighlighted = isHighlightedBySearchTerm(id, text);
  });
</script>

<li bind:this={data} {id} class:highlight={isHighlighted}><slot /></li>
