<script lang="ts">
  import { enhance } from '$app/forms';
  import * as config from '$lib/config';

  export let form;
</script>

<form method="POST" action="?/search" use:enhance>
  <input type="text" name="search" value={form?.searchTerm ?? ''} />
  <button type="submit"><img src="/icons/eye.png" alt="Suchen" /></button>
</form>

<!-- Posts -->
<section>
  {#each form?.results ?? [] as result}
    <h3>
      <a href={result.post.slug} class="title">
        {result.post.title}
      </a>
    </h3>
    <ul class="posts">
      {#each result.matches as match}
        <li class="match">
          ...{match.before}<span class="highlight"> {match.match}</span>{match.after}...
        </li>
      {/each}
    </ul>
  {:else}
    {#if form?.success}
      <p>{config.searchNoResults}</p>
    {/if}
  {/each}
</section>

<style lang="scss">
  input {
    background-color: var(--background-color);
    border-radius: var(--radius-2);
    border: 1px solid gold;
  }

  button {
    background-color: var(--background-color);
  }

  h3 {
    padding: var(--size-2);
  }

  li {
    padding: var(--size-2) 0;
  }

  .highlight {
    color: gold;
    text-shadow: 0 -1px 4px #fff, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #f00;
  }
</style>
