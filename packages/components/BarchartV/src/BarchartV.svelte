<script>
  import { linearScale } from 'yootils';
  import isEqual from 'just-compare';
  import { merge } from 'lamb';
  import { afterUpdate, beforeUpdate, createEventDispatcher } from 'svelte';

  import { makeStyle } from '@svizzle/dom';
  import { arrayMaxWith, getValue } from '@svizzle/utils';

  const dispatch = createEventDispatcher();

  export let shouldResetScroll = false;
  export let focusedKey;
  export let defaultColor = null; // renders black
  export let isInteractive = false;
  export let items;
  export let keyToColor;
  export let keyToLabelFn;
  export let keyToLabel;
  export let title;
  export let valueAccessor = getValue;

  let scrollable;
  let previousItems;
  let wasNotResettingScrollable;

  beforeUpdate(() => {
    wasNotResettingScrollable = !shouldResetScroll
  });

  $: if (wasNotResettingScrollable && shouldResetScroll && scrollable) {
    scrollable.scrollTop = 0;
  };

  $: afterUpdate(() => {
    if (items && shouldResetScroll && !isEqual(previousItems, items)) {
      scrollable.scrollTop = 0;
      previousItems = items;
    }
  });

  $: maxByValue = arrayMaxWith(valueAccessor);
  $: max = maxByValue(items);
  $: scale = linearScale([0, max], [0, 100]);
  $: bars = items.map(item => {
    const displayValue = valueAccessor(item);

    return merge(item, {
      displayValue,
      label: keyToLabel && keyToLabel[item.key]
        ? keyToLabel[item.key]
        : keyToLabelFn
          ? keyToLabelFn(item.key)
          : item.key,
      barStyle: makeStyle({
        'background-color':
          keyToColor && keyToColor[item.key]
            ? keyToColor[item.key]
            : defaultColor,
        width: `${scale(displayValue)}%`
      })
    })
  });
</script>

<div class="BarchartV">
  {#if title}
  <header>
    <h2>{title}</h2>
  </header>
  {/if}
  <main
    bind:this={scrollable}
    class:titled={title}
  >
    {#each bars as {barStyle, displayValue, key, label} (key)}
    <div
      class="item"
      class:clickable="{isInteractive}"
      class:focused="{key === focusedKey}"
      on:click="{ () => { isInteractive && dispatch('clicked', {id: key}) } }"
      on:mouseenter="{ () => isInteractive && dispatch('entered', {id: key}) }"
      on:mouseleave="{ () => isInteractive && dispatch('exited', {id: key}) }"
    >
      <div class="labels">
        <span>{label}</span>
        <span>{displayValue}</span>
      </div>
      <div class="bar" style="{barStyle}"></div>
    </div>
    {/each}
  </main>
</div>

<style lang="less">
  .BarchartV {
    @headerHeight: 2em;

    width: 100%;
    height: 100%;
    padding: 10px; /* FIXME use a variable to align with other content */

    header {
      width: 100%;
      height: @headerHeight;

      display: flex;
      align-items: center;
    }

    main {
      width: 100%;
      height: 100%;
      max-height: 100%;
      overflow-y: auto;
      padding-right: 5px;

      &.titled {
        height: calc(100% - @headerHeight);
        max-height: calc(100% - @headerHeight);
      }

      .item {
        padding: 0.5em 0;

        &:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
        &.focused {
          background-color: rgba(0, 0, 0, 0.05);
        }
        &.clickable {
          cursor: pointer;
        }

        .labels {
          line-height: 1em;
          padding: 0;
          margin: 0;
          color: grey;
          font-size: 0.9em;
          padding-bottom: 0.15em;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bar {
          height: 4px;
          background-color: black;
        }
      }
    }
  }
</style>
