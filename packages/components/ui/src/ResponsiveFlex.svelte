<script>
	import {_screen} from './sensors/screen/ScreenSensor.svelte';
</script>

<div class='ResponsiveFlex {$_screen?.classes}'>
	<slot/>
</div>

<style>
	div {
		align-content: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 2rem 0 3rem 0;
		row-gap: 1em;
	}

	div.medium {
		flex-direction: row;
		row-gap: 0;
	}
</style>
