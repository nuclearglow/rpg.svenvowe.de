<script lang="ts">
  import Fire from '$lib/components/fire.svelte';
  import * as config from '$lib/config';
  import { formatTimelineDate } from '$lib/utils';

  export let data;
</script>

<svelte:head>
  <title>{config.eventsTitle}</title>
</svelte:head>

<section>
  <ul class="timeline">
    {#each data.events as event}
      <li class="event" data-date={formatTimelineDate(event.date)}>
        <Fire />
        <h3>{event.title}</h3>
        <ul>
          {#each event.content as content}
            <li>{content}</li>
          {/each}
        </ul>
      </li>{/each}
  </ul>
</section>

<style lang="less">
  /* Variables */
  @background: var(--color-background);

  @color-primary: #c7530c;
  @color-light: white;
  @color-dim: #6c6d6d;

  @spacing: 25px;
  @radius: 4px;

  @date: 120px;
  @dotborder: 4px;
  @dot: 11px;
  @line: 2px;

  @keyframes pulse {
    0% {
      border-color: #c7530c;
    }
    50% {
      border-color: gold;
    }
    100% {
      border-color: #c7530c;
    }
  }

  /* Timeline */

  section {
    display: flex;
    justify-content: center;
    padding-top: var(--size-6);
  }

  .timeline {
    animation: pulse 10s infinite;

    border-left: @line solid @color-primary;
    border-bottom-right-radius: @radius;
    border-top-right-radius: @radius;

    background: var(--color-background);

    color: var(--color-text);

    margin-left: (@date * 0.6) + @line + @dot + (@dotborder * 2);
    margin-bottom: var(--size-6);

    text-align: left;

    list-style: none;
    list-style-position: outside;
    padding-left: var(--size-5);

    .event {
      position: relative;

      margin-bottom: @spacing;

      padding-bottom: (@spacing * 0.5);

      &:last-of-type {
        padding-bottom: 0;
        margin-bottom: 0;
        border: none;
      }

      &:before,
      &:after {
        position: absolute;
        display: block;
        top: 0;
      }

      &:before {
        top: 6px;
        left: (((@date * 0.6) + @spacing + @line + @dot + (@dotborder * 2)) * 1.5) * -1;

        color: fade(@color-light, 50%);
        content: attr(data-date);

        text-align: right;
        min-width: @date;
      }

      /** Timeline Items */
      ul {
        padding-top: var(--size-2);

        li {
          padding-inline-start: var(--size-2);
        }
      }
    }
  }
</style>
