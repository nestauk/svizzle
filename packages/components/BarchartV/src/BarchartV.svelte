<script>
  import { linearScale } from 'yootils';
  import isEqual from 'just-compare';
  import { merge } from 'lamb';
  import { afterUpdate, beforeUpdate, createEventDispatcher } from 'svelte';

  import { makeStyle } from '@svizzle/dom';
  import { arrayMaxWith, getValue } from '@svizzle/utils';

  const dispatch = createEventDispatcher();

  export let defaultColor;
  export let focusedKey;
  export let focusedKeyColor;
  export let hoverColor;
  export let isInteractive;
  export let items;
  export let keyToColor;
  export let keyToLabel;
  export let keyToLabelFn;
  export let shouldResetScroll;
  export let title;
  export let valueAccessor

  // FIXME https://github.com/sveltejs/svelte/issues/4442
  $: defaultColor = defaultColor || null; // renders black
  $: isInteractive = isInteractive || false;
  $: shouldResetScroll = shouldResetScroll || false;
  $: valueAccessor = valueAccessor || getValue;

  let hoveredKey;

  // scroll business
  let previousItems;
  let scrollable;
  let wasNotResettingScroll;

  beforeUpdate(() => {
    wasNotResettingScroll = !shouldResetScroll
  });
  $: afterUpdate(() => {
    if (items && shouldResetScroll && !isEqual(previousItems, items)) {
      scrollable.scrollTop = 0;
      previousItems = items;
    }
  });
  $: if (wasNotResettingScroll && shouldResetScroll && scrollable) {
    scrollable.scrollTop = 0;
  }

  // FIXME https://github.com/sveltejs/svelte/issues/4442
  $: focusedKeyColor = focusedKeyColor || 'rgba(0, 0, 0, 0.1)';
  $: hoverColor = hoverColor || 'rgba(0, 0, 0, 0.05)';

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
      }),
      barBackgroundStyle: makeStyle({
        'background-color': item.key === focusedKey
          ? focusedKeyColor
          : item.key === hoveredKey
            ? hoverColor
            : null
      }),
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
    on:mouseleave="{ () => { hoveredKey = null } }"
  >
    {#each bars as {barStyle, barBackgroundStyle, displayValue, key, label} (key)}
    <div
      class="item"
      class:clickable="{isInteractive}"
      style="{barBackgroundStyle}"
      on:click="{ () => { isInteractive && dispatch('clicked', {id: key}) } }"
      on:mouseenter="{ () => {
        isInteractive && dispatch('entered', {id: key})
        hoveredKey = key;
      } }"
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

<style>
  .BarchartV {
    --BarchartV_headerHeight: 2em;

    width: 100%;
    height: 100%;
    padding: 10px; /* FIXME use a variable to align with other content */
  }

  .BarchartV header {
    width: 100%;
    height: var(--BarchartV_headerHeight);
    display: flex;
    align-items: center;
  }

  .BarchartV main {
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    padding-right: 5px;
  }

  .BarchartV main.titled {
    height: calc(100% - var(--BarchartV_headerHeight));
    max-height: calc(100% - var(--BarchartV_headerHeight));
  }

  .BarchartV main .item {
    padding: 0.5em 0;
  }

  .BarchartV main .item.clickable {
    cursor: pointer;
  }

  .BarchartV main .item .labels {
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

  .BarchartV main .item .bar {
    height: 4px;
    background-color: black;
  }
</style>
