<script lang="ts">
  import * as config from '$lib/config';
  import { formatDate } from '$lib/utils';

  export let data;
</script>

<svelte:head>
  <title>{config.title}</title>
</svelte:head>

<!-- Posts -->
<section>
  <div class="posts">
    {#each data.posts as post}
      <div class="post">
        <a href="post/{post.slug}" class="title">{post.title}</a>
        <p class="date">{formatDate(post.date)}</p>
        <p class="description">{post.description}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .posts {
    display: grid;
    gap: 2rem;
  }

  .post {
    max-inline-size: var(--size-content-4);
  }

  .post:not(:last-child) {
    padding-bottom: var(--size-2);
  }

  .title {
    font-size: var(--font-size-fluid-2);
  }

  .date {
    color: var(--text-2);
  }

  .description {
    margin-top: var(--size-3);
  }
</style>
