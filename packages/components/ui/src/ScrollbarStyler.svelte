<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {onDestroy} from 'svelte';

	import {isClientSide} from './utils/env';

	export let enabled = true;
	export let theme;

	export let defaultTheme = {
		scrollbarTrackColor: 'red',
		scrollbarThumbColor: 'blue',
	};

	const getRootElement = () => globalThis.document?.documentElement;
	const getClassList = () => getRootElement()?.classList;
	const enableStyle = () => getClassList()?.add('styledScrollbar');
	const disableStyle = () => getClassList()?.remove('styledScrollbar');

	onDestroy(disableStyle);

	$: rootElement = getRootElement();
	$: enabled = enabled ?? true;
	$: isClientSide && enabled
		? enableStyle()
		: disableStyle();
	$: theme = {...defaultTheme, ...theme};
	$: if (rootElement) {
		rootElement.style = makeStyleVars(theme);
	}
</script>

<style>
	:global(.styledScrollbar *::-webkit-scrollbar) {
		width: 8px;
	}

	:global(.styledScrollbar *::-webkit-scrollbar-track) {
		background-color: none;
	}
	:global(.styledScrollbar *::-webkit-scrollbar-track:hover) {
		background-color: var(--scrollbarTrackColor);
	}
	:global(.styledScrollbar *::-webkit-scrollbar-thumb) {
		background-color: var(--scrollbarThumbColor);
		border-radius: 50px;
	}
</style>
