<script>
  import ChoroplethSVG from './ChoroplethSVG.svelte';

  export let colorDefaultFill;
  export let colorSea;
  export let colorStroke;
  export let colorStrokeSelected;
  export let geojson;
  export let isInteractive;
  export let key;
  export let keyToColor;
  export let projection;
  export let selectedKeys;
  export let sizeStroke;
  export let sizeStrokeSelected;

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
    {geojson}
    {height}
    {isInteractive}
    {key}
    {keyToColor}
    {projection}
    {selectedKeys}
    {sizeStroke}
    {sizeStrokeSelected}
    {width}
    on:clicked
    on:entered
    on:exited
  />
</div>

<style>
  .ChoroplethDiv {
    width: 100%;
    height: 100%;
  }
</style>
