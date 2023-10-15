<script lang="ts">
  import { formatDate } from '$lib/utils';

  export let data;
</script>

<svelte:head>
  <title>{data.meta.title}</title>

  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <!-- Title -->
  <hgroup>
    <h1>{data.meta.title}</h1>
    <p>{formatDate(data.meta.date)}</p>
  </hgroup>

  <!-- Tags -->
  <!-- TODO: re-instantiate when multiple tags are there, link the tags to display a filtered list
  <div class="tags">
    {#each data.meta.categories as category}
      <span class="surface-4">&num;{category}</span>
    {/each}
  </div>
  -->

  <!-- Post -->
  <div class="prose">
    <svelte:component this={data.content} />
  </div>
</article>

<style>
  article {
    max-inline-size: var(--size-content-4);
    margin-inline: auto;
    margin-bottom: var(--size-6);
  }

  h1 {
    font-size: var(--font-size-6);
  }

  h1 + p {
    margin-top: var(--size-2);
    color: var(--text-2);
  }

  /* .tags {
    display: flex;
    gap: var(--size-3);
    margin-top: var(--size-7);
  }

  .tags > * {
    padding: var(--size-2) var(--size-3);
    border-radius: var(--radius-round);
  } */

  @media only screen and (max-width: 1440px) {
    h1 {
      font-size: var(--font-size-5);
    }
  }
</style>
