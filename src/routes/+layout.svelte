<script lang="ts">
  import Fireflies from '$lib/components/fireflies.svelte';
  import Header from '$lib/components/header.svelte';
  import PageTransition from '$lib/components/transition.svelte';

  import 'open-props/buttons';
  import 'open-props/normalize';
  import 'open-props/style';

  import Footer from '$lib/components/footer.svelte';
  import '../styles/_reset.css';
  import '../styles/app.css';
</script>

<Fireflies />

<div class="layout">
  <Header />

  <main>
    <PageTransition>
      <slot />
    </PageTransition>
  </main>

  <Footer />
</div>

<style>
  .layout {
    max-inline-size: 1440px;
    margin-inline: auto;
  }

  main {
    height: 100vh;

    padding-top: var(--size-10);
    padding-inline: var(--size-4) var(--size-4);
  }

  @media only screen and (max-width: 1440px) {
    .layout {
      padding-inline: var(--size-1);
    }
  }
</style>
