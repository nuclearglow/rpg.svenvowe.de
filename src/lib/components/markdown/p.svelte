<script lang="ts">
  import { getHash } from '$lib/utils';
  import { onMount } from 'svelte';

  let data: HTMLParagraphElement;
  let id: string;
  let isHighlighted: boolean;

  onMount(async () => {
    id = await getHash(data.innerText.trim());

    const { search, hash } = window.location;

    const urlParams = new URLSearchParams(search);
    const searchTerm = urlParams.get('searchTerm') ?? '';

    if (id === hash.substring(1) && searchTerm !== null) {
      isHighlighted = data.innerText.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });
</script>

<p bind:this={data} {id} class:highlight={isHighlighted}><slot /></p>
