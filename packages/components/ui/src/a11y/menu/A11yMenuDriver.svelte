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

	const colorTargetSelector = 'html';
	const textTargetSelector = 'body';

	export let defaults = null;
	export let useLocalStorage = true;

	let defaultValue;

	$: defaults && (defaultValue = mergeDefaultSettings(defaults));
	$: colorTargetNode = isClientSide && document.querySelector(colorTargetSelector);
	$: colorTargetNode?.classList?.add(['colorCorrected']);
	$: colorTargetNode && applyStyles(colorTargetNode.style, $_a11yColorStyles);
	$: textTargetNode = isClientSide && document.querySelector(textTargetSelector);
	$: textTargetNode && applyStyles(textTargetNode.style, $_a11yTextStyles);
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
