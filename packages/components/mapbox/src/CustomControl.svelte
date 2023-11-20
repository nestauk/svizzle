<script>
	import {getContext} from 'svelte';

	import {CustomControl} from './util.js';

	export let position;

	const {_map} = getContext('Mapbox');

	const customControl = node => {
		const control = new CustomControl(node);
		$_map.addControl(control, position);

		return {
			destroy () {
				$_map.removeControl(control);
			}
		}
	}
</script>

<div use:customControl>
	<slot />
</div>
