<script lang="ts">
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';

  let root: HTMLElement;

  if (browser) {
    root = <HTMLElement>document.querySelector(':root');
  }

  onMount(() => {
    root?.style?.setProperty('--color-firefly', 'red');
  });

  onDestroy(() => {
    let root = <HTMLElement>document.querySelector(':root');
    root?.style?.setProperty('--color-firefly', 'gold');
  });
</script>

<div class="demon">
  <img src="/icons/azekiel.png" alt="Azekiel" />

  <p>
    Wer die Vergangenheit kontrolliert, kontrolliert die Zukunft. Wer die Gegenwart kontrolliert,
    kontrolliert die Vergangenheit. Wer die Gedanken kontrolliert, kontrolliert die Realität!
  </p>
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
