<script lang="ts">
  import { enhance } from '$app/forms';
  import * as config from '$lib/config';
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

  export const snapshot = {
    capture: () => ({ results, searchTerm }),
    restore: ({ searchTerm: storedSearchTerm, results: storedResults }) => {
      searchTerm = storedSearchTerm;
      results = storedResults;
    },
  };
</script>

<form
  method="POST"
  action="?/search"
  use:enhance={() => {
    return async ({ update }) => {
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

<!-- Posts -->
<section>
  {#each results as result}
    <h3>
      <a href={result.post.slug} class="title">
        {result.post.title}
      </a>
    </h3>
    <p>{formatDate(result.post.date)}</p>
    <ul class="posts">
      {#each result.matches as match}
        <li class="match">
          ...{match.before}<span class="highlight"> {match.match}</span>{match.after}...
        </li>
      {/each}
    </ul>
  {:else}
    {#if form?.success}
      <h3>{config.searchNoResults}</h3>
    {/if}
  {/each}
</section>

<style lang="scss">
  form {
    position: sticky;
    top: var(--size-8);
    width: 100%;
    padding-bottom: var(--size-2);

    background-color: var(--background-color);
    box-shadow: 0 16px 8px -8px var(--background-color);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--size-1);

    input {
      border-radius: var(--radius-2);
      border: 1px solid gold;

      text-align: center;
    }

    button {
      height: 30px;

      background-color: var(--background-color);
      border: none;
      box-shadow: none;

      img {
        height: 20px;
        transition: height linear 666ms;

        &.expanded {
          height: 30px;
        }
      }
    }
  }

  h3 {
    padding: var(--size-3) 0;
  }

  li {
    padding: var(--size-2) 0;
  }

  .highlight {
    color: gold;
    text-shadow: 0 -1px 4px #fff, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #f00;
  }
</style>
