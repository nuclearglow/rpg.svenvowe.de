<script lang="ts" context="module">
  // replaces the Markdown img component with our own
  import img from '$lib/components/markdown/img.svelte';
  import p from '$lib/components/markdown/p.svelte';

  export { img, p };
</script>

<slot />
