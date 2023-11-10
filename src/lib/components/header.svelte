<script lang="ts">
  import { page } from '$app/stores';
  import Menuitem from '$lib/components/menuitem.svelte';
  import * as config from '$lib/config';

  let path: string;
  $: path = $page.url.pathname;
</script>

<nav id="menu" class="primary" class:no-shadow={path === '/search'}>
  <div class="campaign">
    <Menuitem url="/" icon="hearth" text={config.title} />
    <Menuitem url="/timeline" icon="timeline" text={config.timelineTitle} />
  </div>

  <div class="links">
    <Menuitem url="/chars" icon="sheet" text={config.menuItemChars} />
    <Menuitem url="/map" icon="map" text={config.menuItemMap} />
    <Menuitem url="/search" icon="eye" text={config.menuItemSearch} />
  </div>
</nav>

<style lang="scss">
  .primary {
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

    .links {
      display: flex;
      gap: var(--size-7);
      margin-block: 0;
    }

    @media only screen and (max-width: 400px) {
      font-size: var(--font-size-fluid-1);
      font-weight: var(--font-weight-1);
      letter-spacing: var(--font-letterspacing-0);
    }

    @media only screen and (max-width: 768px) {
      padding: 0 var(--size-3);

      .campaign {
        gap: var(--size-2);
      }

      .links {
        gap: var(--size-2);
      }
    }

    @media only screen and (min-width: 1280px) {
      justify-content: center;
      gap: var(--size-7);
    }
  }
</style>
