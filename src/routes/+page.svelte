<script lang="ts">
  import PostSubTitle from '$lib/components/PostSubTitle.svelte';
  import * as config from '$lib/config';

  export let data;
</script>

<svelte:head>
  <title>{config.title}</title>
</svelte:head>

<!-- Posts -->
<section>
  <div class="posts">
    {#each data.posts as post}
      <div class="post">
        <a href="post/{post.slug}" class="title">{post.title}</a>
        <PostSubTitle date={post.date} hash={post.xpHash} />
        <p class="description">{post.description}</p>
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  .posts {
    display: grid;
    gap: 2rem;

    .post {
      max-inline-size: var(--size-content-4);
    }

    .post {
      padding-bottom: var(--size-2);

      &:last-child {
        padding-bottom: var(--size-4);
      }
    }

    .title {
      font-size: var(--font-size-fluid-2);
    }

    .description {
      margin-top: var(--size-3);
    }
  }
</style>
