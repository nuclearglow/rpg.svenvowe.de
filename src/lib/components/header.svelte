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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--size-6) var(--size-4) var(--size-6) 0;

    .links {
      display: flex;
      gap: var(--size-7);
      margin-block: 0;
    }
  }
</style>
