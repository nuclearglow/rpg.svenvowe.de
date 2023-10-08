<script lang="ts" context="module">
  // replaces the Markdown img component with our own
  import img from '$lib/components/img.svelte';
  export { img };
</script>

<slot />
