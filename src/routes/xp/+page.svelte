<script lang="ts">
  import { browser } from '$app/environment';
  import * as config from '$lib/config';
  import { formatDate } from '$lib/utils';
  import { onMount } from 'svelte';

  export let data;

  function isHighlighted(id: string) {
    return browser && !!window.location.hash && window.location.hash.slice(1) === id;
  }

  onMount(async () => {
    const id = window.location.hash.slice(1);
    const element = document.getElementById(id);

    if (id && element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
</script>

<svelte:head>
  <title>{config.xpTitle}</title>
</svelte:head>

<section>
  <h3>{config.xpTitle}</h3>

  <div class="xp-events">
    {#each data.xpEvent as xpEvent}
      <div class="xp-event">
        <h4 id={xpEvent.hash} class:highlight={isHighlighted(xpEvent.hash)}>
          {xpEvent.title}
        </h4>
        <div class="date">
          {formatDate(xpEvent.date)}
        </div>
        <ul>
          {#each xpEvent.content as content}
            <li>{content}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    padding-bottom: var(--size-6);

    h3 {
      padding-bottom: var(--size-6);
    }

    h4,
    h3,
    .date {
      scroll-margin-top: calc(var(--menu-height) + var(--size-2));

      text-align: center;
      width: 100%;
      max-inline-size: 100vw;
    }

    .highlight {
      color: gold;
      text-shadow: var(--text-shadow-fire);
    }

    .xp-events {
      display: flex;
      flex-direction: column;
      gap: var(--size-6);

      .xp-event {
        .date {
          color: var(--text-2);
          padding: var(--size-2) 0;
        }

        ul {
          width: 100%;
          max-inline-size: 100vw;
          padding-top: var(--size-2);
          list-style-image: url(/icons/xp.png);

          li {
            width: 100%;
            max-inline-size: 100vw;
            padding-inline-start: var(--size-2);
          }
        }
      }
    }
  }
</style>
