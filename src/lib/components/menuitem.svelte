<script lang="ts">
  import { page } from '$app/stores';

  let path: string;
  $: path = $page.url.pathname;

  export let icon: string;
  export let url: string;
  export let text: string;
</script>

<div class="menu-item">
  <img src="/icons/{icon}.png" alt="icon for menu entry {text}" />
  <a class:active={path === url} href={url}>{text}</a>
</div>

<style lang="scss">
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    img {
      padding: 0 var(--size-1);
    }

    a {
      color: inherit;
      text-decoration: none;
      font-size: var(--font-size-1);
      transition: color 666ms linear;

      &.active {
        color: gold;
      }
    }

    @media (min-width: 1440px) {
      img {
        width: 32px;
      }

      a {
        font-size: var(--font-size-2);
      }
    }
  }
</style>
