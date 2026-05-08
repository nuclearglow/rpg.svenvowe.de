<script lang="ts">
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';

  let root: HTMLElement | null;

  onMount(() => {
    root = <HTMLElement>document?.querySelector(':root');
    root?.style?.setProperty('--color-firefly', 'red');
  });

  onDestroy(() => {
    if (browser) {
      root = <HTMLElement>document?.querySelector(':root');
      root?.style?.setProperty('--color-firefly', 'gold');
    }
  });
</script>

<div class="demon">
  <img src="/icons/azekiel.png" alt="Azekiel" />

  <p>Wer die Vergangenheit beherrscht, kontrolliert die Zukunft.</p>
</div>

<style lang="scss">
  .demon {
    width: 100%;
    height: 100%;
    overflow: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    p {
      padding: var(--size-3);
    }
  }
</style>
