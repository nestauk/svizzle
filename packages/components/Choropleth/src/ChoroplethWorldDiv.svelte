<script>
  import ChoroplethDiv from './ChoroplethDiv.svelte';
  import geojson from '../data/2/world_110m_iso_a2_geo.json';

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
  {geojson}
  {isInteractive}
  {keyToColor}
  {projection}
  {selectedKeys}
  {sizeStroke}
  {sizeStrokeSelected}
  key='iso_a2'
  on:clicked
  on:entered
  on:exited
/>
