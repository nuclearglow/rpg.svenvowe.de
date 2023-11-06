<script lang="ts" context="module">
  import h2 from '$lib/components/mdsvex/h2.svelte';
  import img from '$lib/components/mdsvex/img.svelte';
  import li from '$lib/components/mdsvex/li.svelte';
  import p from '$lib/components/mdsvex/p.svelte';

  /** Replaces the Markdown img component with our own custom components */
  export { h2, img, li, p };
</script>

<slot />
