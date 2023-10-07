<script lang="ts">
  import * as config from '$lib/config';
</script>

<nav>
  <!-- Title -->
  <a href="/" class="title">
    <b>{config.title}</b>
  </a>

  <!-- Navigation -->
  <ul class="links">
    <li>
      <a href="/chars">Abenteurer</a>
    </li>
    <li>
      <a href="/map">Karte</a>
    </li>
  </ul>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: var(--size-7);
  }

  .links {
    display: flex;
    gap: var(--size-7);
    margin-block: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
</style>
