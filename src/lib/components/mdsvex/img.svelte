<script lang="ts">
  export let src: string;
  export let alt: string;
</script>

<!-- lazy loading images in the blog posts -->
<a href={src}>
  <img loading="lazy" {src} {alt} />
</a>
