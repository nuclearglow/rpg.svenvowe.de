<script lang="ts">
  import * as config from '$lib/config';

  export let hash: string;
</script>

<p class="xp-link">
  <a data-sveltekit-reload href={`/xp#${hash}`}>
    <img src="/icons/xp.png" alt={config.xpTitle} />
    {config.xpTitle}
  </a>
</p>

<style lang="scss">
  .xp-link {
    a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--size-1);
    }
  }
</style>
