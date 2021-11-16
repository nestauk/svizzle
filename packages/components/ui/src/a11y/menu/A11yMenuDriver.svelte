<script>
	import StorageIO from '../../io/storage/StorageIO.svelte';
	import {isClientSide} from '../../utils/env.js';
	import ColorCorrection from './ColorCorrection.svelte';
	import {
		_a11yColorStyles,
		_a11yTextStyles,
		_a11ySettings,
		applyStyles,
		mergeDefaultSettings,
	} from './settings';

	export let targetSelector = 'html';
	export let defaults = null;
	export let useLocalStorage = true;

	let defaultValue;

	$: defaults && (defaultValue = mergeDefaultSettings(defaults));
	$: targetNode = isClientSide && document.querySelector(targetSelector);
	$: targetNode?.classList?.add(['color-corrected']);
	$: targetNode && applyStyles(targetNode.style, $_a11yTextStyles);
	$: targetNode && applyStyles(targetNode.style, $_a11yColorStyles);
</script>

<ColorCorrection />

{#if useLocalStorage}
	<StorageIO
		_store={_a11ySettings}
		{defaultValue}
		isReactive={true}
		key='a11ySettings'
		type='localStorage'
	/>
{/if}
