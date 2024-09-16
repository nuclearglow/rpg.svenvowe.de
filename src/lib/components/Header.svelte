<script lang="ts">
  import { page } from '$app/stores';
  import MenuItem from '$lib/components/MenuItem.svelte';
  import { menu } from '$lib/config';

  let path: string;
  $: path = $page?.url?.pathname ?? '';
</script>

<nav id="menu" class:no-shadow={path === '/search'}>
  {#each Object.entries(menu) as [category, menuItems]}
    <div class={category}>
      {#each menuItems as item}
        <MenuItem {...item} />
      {/each}
    </div>
  {/each}
</nav>

<style lang="scss">
  nav {
    position: fixed;
    top: 0;
    left: 0;

    z-index: 1000;

    width: 100%;
    height: var(--size-8);
    padding: 0 var(--size-4);

    background-color: var(--background-color);
    box-shadow: 0 16px 8px -8px var(--background-color);

    &.no-shadow {
      box-shadow: none;
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--size-4);

    .campaign {
      display: flex;
      gap: var(--size-7);
      margin-block: 0;
    }

    .lore {
      display: flex;
      gap: var(--size-7);
      margin-block: 0;
    }

    @media only screen and (max-width: 400px) {
      padding: 0 var(--size-1);
      font-size: var(--font-size-fluid-1);
      font-weight: var(--font-weight-1);
      letter-spacing: var(--font-letterspacing-0);

      gap: var(--size-1);

      .campaign,
      .lore {
        gap: var(--size-1);
      }
    }

    @media only screen and (min-width: 401px) and (max-width: 768px) {
      padding: 0 var(--size-3);

      gap: var(--size-2);

      .campaign,
      .lore {
        gap: var(--size-2);
      }
    }

    @media only screen and (min-width: 1280px) {
      justify-content: center;
      gap: var(--size-7);
    }
  }
</style>
