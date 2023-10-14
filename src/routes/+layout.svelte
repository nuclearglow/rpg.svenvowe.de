<script lang="ts">
  import Fireflies from '$lib/components/fireflies.svelte';
  import Header from '$lib/components/header.svelte';
  import PageTransition from '$lib/components/transition.svelte';

  import 'open-props/buttons';
  import 'open-props/normalize';
  import 'open-props/style';

  import '../styles/_reset.css';
  import '../styles/app.css';

  export let data;
</script>

<Fireflies />

<div class="layout">
  <Header />

  <main>
    <PageTransition url={data.url}>
      <slot />
    </PageTransition>
  </main>
</div>

<style>
  .layout {
    height: 100%;
    max-inline-size: 1440px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    margin-inline: auto;
    padding-inline: var(--size-4) var(--size-4);
  }

  @media (min-width: 1440px) {
    .layout {
      padding-inline: var(--size-1);
    }
  }
</style>
