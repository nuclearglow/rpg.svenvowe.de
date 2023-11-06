<script lang="ts">
  import Menuitem from '$lib/components/menuitem.svelte';
  import * as config from '$lib/config';
</script>

<nav id="menu">
  <Menuitem url="/" icon="shard" text={config.title} />

  <div class="links">
    <Menuitem url="/chars" icon="sheet" text={config.menuItemChars} />
    <Menuitem url="/map" icon="map" text={config.menuItemMap} />
    <Menuitem url="/search" icon="eye" text={config.menuItemSearch} />
  </div>
</nav>

<style lang="scss">
  nav {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: var(--size-8);
    padding: 0 var(--size-4);

    background-color: var(--background-color);
    box-shadow: 0 16px 8px -8px var(--background-color);

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: var(--font-size-fluid-1);

    .links {
      display: flex;
      gap: var(--size-7);
      margin-block: 0;
    }

    @media only screen and (max-width: 768px) {
      padding: 0 var(--size-3);

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
