<script>
  import ChoroplethDiv from './ChoroplethDiv.svelte';
  import topojson from '@svizzle/atlas/data/1/world_110m_iso_a2_topo.json';
  // FIXME unpublished for now, works only locally for now

  export let colorDefaultFill;
  export let colorSea;
  export let colorStroke;
  export let colorStrokeSelected;
  export let isInteractive;
  export let keyToColor;
  export let projection;
  export let selectedKeys;
  export let sizeStroke;
  export let sizeStrokeSelected;
</script>

<ChoroplethDiv
  {colorDefaultFill}
  {colorSea}
  {colorStroke}
  {colorStrokeSelected}
  {isInteractive}
  {keyToColor}
  {projection}
  {selectedKeys}
  {sizeStroke}
  {sizeStrokeSelected}
  {topojson}
  key='iso_a2'
  on:clicked
  on:entered
  on:exited
  topojsonId='countries'
/>
