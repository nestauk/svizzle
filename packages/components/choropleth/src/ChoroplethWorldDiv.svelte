<script>
  import ChoroplethDiv from './ChoroplethDiv.svelte';
  import topojson from '@svizzle/atlas/gist/World_110m_iso_a2_topo.json';

  export let colorDefaultFill;
  export let colorSea;
  export let colorStroke;
  export let colorStrokeSelected;
  export let isInteractive;
  export let keyToColor;
  export let keyToColorFn;
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
  {keyToColorFn}
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
