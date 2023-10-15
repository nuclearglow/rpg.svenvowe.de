<script lang="ts">
  import Menuitem from '$lib/components/menuitem.svelte';
  import * as config from '$lib/config';
</script>

<nav>
  <Menuitem url="/" icon="shard" text={config.title} />

  <div class="links">
    <Menuitem url="/chars" icon="sheet" text="Abenteurer" />
    <Menuitem url="/map" icon="map" text="Karten" />
  </div>
</nav>

<style lang="scss">
  nav {
    position: fixed;
    width: 100%;
    height: var(--size-8);
    padding: 0 var(--size-4);

    max-width: 1440px;
    background-color: var(--background-color);
    box-shadow: 0 16px 8px -8px var(--background-color);

    display: flex;
    justify-content: space-between;
    align-items: center;

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
  }
</style>
