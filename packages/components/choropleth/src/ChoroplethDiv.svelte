<script>
  import ChoroplethSVG from './ChoroplethSVG.svelte';

  export let colorDefaultFill;
  export let colorSea;
  export let colorStroke;
  export let colorStrokeSelected;
  // export let geojson;
  export let isInteractive;
  export let key;
  export let keyToColor;
  export let keyToColorFn;
  export let projection;
  export let selectedKeys;
  export let sizeStroke;
  export let sizeStrokeSelected;
  export let topojson;
  export let topojsonId;

  let height;
  let width;
</script>

<div
  class="ChoroplethDiv"
  bind:clientHeight={height}
  bind:clientWidth={width}
>
  <ChoroplethSVG
    {colorDefaultFill}
    {colorSea}
    {colorStroke}
    {colorStrokeSelected}
    {height}
    {isInteractive}
    {key}
    {keyToColor}
    {keyToColorFn}
    {projection}
    {selectedKeys}
    {sizeStroke}
    {sizeStrokeSelected}
    {topojson}
    {topojsonId}
    {width}
    on:clicked
    on:entered
    on:exited
  />
  <!-- {geojson} -->
</div>

<style>
  .ChoroplethDiv {
    width: 100%;
    height: 100%;
  }
</style>
