<script lang="ts">
  import * as config from '$lib/config';
  import { formatDate } from '$lib/utils';

  export let date: string;
  export let hash: string;
</script>

<div class="subtitle">
  <p class="date">
    <img src="/icons/timeline.png" alt="Datum" />
    {formatDate(date)}
  </p>
  <p class="xp-link">
    <a data-sveltekit-reload href={`/xp#${hash}`}>
      <img src="/icons/xp.png" alt={config.xpTitle} />
      {config.xpTitle}
    </a>
  </p>
</div>

<style lang="scss">
  .subtitle {
    display: flex;
    justify-content: flex-start;
    gap: var(--size-4);

    margin-top: var(--size-2);

    .date {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--size-1);
    }

    .xp-link {
      a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: var(--size-1);
      }
    }

    .date {
      color: var(--text-2);
    }
  }
</style>
