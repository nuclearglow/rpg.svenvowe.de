<script lang="ts">
  import { SEARCH_RESULT_SCROLL_DELAY_MS, SEARCH_RESULT_SCROLL_OFFSET } from '$lib/constants.js';
  import { formatDate } from '$lib/utils';
  import { onMount } from 'svelte';

  export let data;

  onMount(() => {
    /**
     * Vanilla JS manual anchor scrolling due to custom MdsVeX svelte component rendering that seems
     * to be detached from svelte onload events
     */
    setTimeout(() => {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      const menuElement = document.getElementById('menu');

      if (id && element && menuElement) {
        window.scrollTo({
          behavior: 'smooth',
          top: Math.max(
            element.getBoundingClientRect().top -
              menuElement.getBoundingClientRect().bottom -
              SEARCH_RESULT_SCROLL_OFFSET,
            0,
          ),
        });
      }
    }, SEARCH_RESULT_SCROLL_DELAY_MS);
  });
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
    padding-bottom: var(--size-6);
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
