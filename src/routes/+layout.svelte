<script lang="ts">
  import Fireflies from './fireflies.svelte';
  import Footer from './footer.svelte';
  import Header from './header.svelte';
  import PageTransition from './transition.svelte';

  import 'open-props/buttons';
  import 'open-props/normalize';
  import 'open-props/style';

  import '../styles/_reset.css';
  import '../styles/app.css';

  export let data;
</script>

<Fireflies />

<div class="layout">
  <!-- Header -->
  <Header />

  <main>
    <!-- Black hole for other content -->
    <PageTransition url={data.url}>
      <slot />
    </PageTransition>
  </main>

  <!-- Footer -->
  <Footer />
</div>

<style>
  .layout {
    height: 100%;
    max-inline-size: 1440px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    margin-inline: auto;
  }

  @media (min-width: 1440px) {
    .layout {
      padding-inline: 0;
    }
  }
</style>
