<script lang="ts">
  import 'open-props/buttons';
  import 'open-props/normalize';
  import 'open-props/style';

  import Fireflies from '$lib/components/Fireflies.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Transition from '$lib/components/Transition.svelte';

  import '../styles/_reset.css';
  import '../styles/app.css';
</script>

<Fireflies />

<div class="layout">
  <Header />

  <main>
    <Transition>
      <slot />
    </Transition>
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
