<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<!-- lazy loading images in the blog posts -->
<img {src} {alt} loading="lazy" />
