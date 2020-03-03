<script>
  import { createEventDispatcher } from 'svelte';
  import { geoPath } from 'd3-geo';
  import * as projections from './projections';
  import * as _ from 'lamb';
  import { makeUpdateFeaturesProperty } from '@svizzle/geo';
  import { isNotNullWith } from '@svizzle/utils';

  const dispatch = createEventDispatcher();
  const hasColor = isNotNullWith(_.getPath('properties.color'));
  const safety = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  };

  export let colorDefaultFill;
  export let colorSea;
  export let colorStroke;
  export let colorStrokeSelected;
  export let geojson;
  export let height;
  export let isInteractive;
  export let key;
  export let key_alt;
  export let keyToColor;
  export let projection;
  export let selectedKeys;
  export let sizeStroke;
  export let sizeStrokeSelected;
  export let width;

  // FIXME https://github.com/sveltejs/svelte/issues/4442
  $: colorDefaultFill = colorDefaultFill || 'white';
  $: colorSea = colorSea || 'white';
  $: colorStroke = colorStroke || 'grey';
  $: colorStrokeSelected = colorStrokeSelected || 'black';
  $: key_alt = key_alt || 'name';
  $: isInteractive = isInteractive || false;
  $: projection = projection && projections[projection] || projections.geoEquirectangular;
  $: selectedKeys = selectedKeys || [];
  $: sizeStroke = sizeStroke || 0.5;
  $: sizeStrokeSelected = sizeStrokeSelected || 1;

  $: height = Math.max(0, height - safety.top - safety.bottom);
  $: width = Math.max(0, width - safety.left - safety.right);
  $: createColoredGeojson = makeUpdateFeaturesProperty({
    map: keyToColor, propName: 'color', key, key_alt
  });
  $: coloredGeojson = geojson && createColoredGeojson(geojson);
  $: fitProjection = geojson && projection().fitSize([width, height], geojson);
  $: geopath = fitProjection && geoPath(fitProjection);
  $: getPayload = feature => feature.properties[key] || feature.properties[key_alt];
  $: isSelected = feature =>
    selectedKeys && selectedKeys.length &&
    selectedKeys.includes(getPayload(feature));
  $: isReady = geopath && coloredGeojson;
  $: isClickable = feature => isInteractive && hasColor(feature);
</script>

<svelte:options namespace="svg" />

{#if height && width}
<svg {height} {width}>
  <g transform="{`translate(${safety.left},${safety.top})`}">
    {#if isReady}
    <rect
      {height}
      {width}
      fill={colorSea}
    />
    {#each coloredGeojson.features as feature}
    <g class="feature" id='{key_alt}'>
      <path
        class:clickable="{isClickable(feature)}"
        class:deselected="{!isSelected(feature)}"
        d="{geopath(feature)}"
        fill="{feature.properties.color || colorDefaultFill}"
        stroke="{isSelected(feature) ? colorStrokeSelected : colorStroke}"
        stroke-width="{isSelected(feature) ? sizeStrokeSelected : sizeStroke}"
        on:click="{ () => isClickable(feature) && dispatch('clicked', getPayload(feature)) }"
        on:mouseenter="{ () => isInteractive && dispatch('entered', getPayload(feature)) }"
        on:mouseleave="{ () => isInteractive && dispatch('exited', getPayload(feature)) }"
      />
    </g>
    {/each}
    {/if}
  </g>
</svg>
{/if}

<style>
  svg {
    width: 100%;
    height: 100%;
  }

  .feature path.clickable {
    cursor: pointer;
  }
  .feature path.deselected {
    fill-opacity: 0.25;
  }
</style>
