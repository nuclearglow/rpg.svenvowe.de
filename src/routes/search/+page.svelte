<script lang="ts">
  import { enhance } from '$app/forms';
  import { searchNoResults } from '$lib/config';
  import type { SearchResult } from '$lib/types.js';
  import { formatDate } from '$lib/utils';

  export let form;

  let searching = false;

  let searchTerm: string;
  $: searchTerm = form?.searchTerm ?? '';

  let expanded: boolean;
  $: expanded = Boolean(searching || searchTerm.length);

  let results: SearchResult[];
  $: results = form?.results ?? [];

  /** Store search term and results in ephemeral cache it will survive local page navigation */
  export const snapshot = {
    capture: () => ({ results, searchTerm }),
    restore: ({ searchTerm: storedSearchTerm, results: storedResults }) => {
      searchTerm = storedSearchTerm;
      results = storedResults;
    },
  };
</script>

<div class="search">
  <form
    method="POST"
    action="?/search"
    use:enhance={() => {
      return async ({ update }) => {
        /** Do not reset the form values after submit */
        await update({ reset: false });
      };
    }}
  >
    <button type="submit">
      <img class:expanded src="/icons/eye.png" alt="Suchen" />
    </button>

    <input
      type="text"
      name="search"
      value={searchTerm}
      on:focus={() => (searching = true)}
      on:blur={() => (searching = false)}
    />

    <button type="submit">
      <img class:expanded src="/icons/eye.png" alt="Suchen" />
    </button>
  </form>
</div>

<!-- Posts -->
<section>
  {#each results as result}
    <h3>
      <a href="post/{result.post.slug}" class="title">
        {result.post.title}
      </a>
    </h3>
    <p>{formatDate(result.post.date)}</p>
    <ul class="posts">
      {#each result.matches as match}
        <li class="match">
          <a
            data-sveltekit-reload
            href={`post/${result.post.slug}?searchTerm=${searchTerm}#${match.hash}`}
          >
            ...{match.before}<span class="highlight">{match.match}</span>{match.after}...
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    {#if form?.success}
      <h3>{searchNoResults}</h3>
    {/if}
  {/each}
</section>

<style lang="scss">
  .search {
    position: fixed;
    top: var(--size-8);
    left: 0;
    right: 0;
    width: 100%;

    padding: var(--size-1) 0 var(--size-1);

    background-color: var(--background-color);
    box-shadow: 0 16px 8px -8px var(--background-color);

    form {
      padding: 0 var(--size-4);

      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--size-1);

      input {
        width: 100%;
        min-width: 50px;
        max-width: 300px;

        border-radius: var(--radius-2);
        border: 1px solid gold;

        text-align: center;

        outline: none;
      }

      button {
        background-color: var(--background-color);
        border: none;
        box-shadow: none;

        img {
          min-width: 20px;
          min-height: 20px;
          transition: height linear 666ms;

          &.expanded {
            min-width: 24px;
            min-height: 24px;
          }
        }
      }
    }
  }

  section {
    padding-top: var(--size-4);
  }

  h3 {
    padding: var(--size-3) 0;
  }

  li {
    max-inline-size: unset;
    padding: var(--size-2) 0;

    a {
      text-decoration: none;
      color: var(--text-color);
    }
  }

  .highlight {
    color: gold;
    text-shadow: var(--text-shadow-fire);
  }
</style>
