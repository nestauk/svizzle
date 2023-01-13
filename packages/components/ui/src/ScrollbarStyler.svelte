<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {onDestroy} from 'svelte';

	import {isClientSide} from './utils/env';

	export let isEnabled = true;
	export let theme;

	export let defaultTheme = {
		thumbColor: 'grey',
		thumbRadius: '50px',
		trackBorderColor: 'lightgrey',
		trackColor: 'rgb(250,250,250)',
		trackWidth: '9px',
	};

	// eslint-disable-next-line no-undef
	const getRootElement = () => globalThis.document?.documentElement;
	const getClassList = () => getRootElement()?.classList;
	const enableStyle = () => getClassList()?.add('styledScrollbar');
	const disableStyle = () => getClassList()?.remove('styledScrollbar');

	onDestroy(disableStyle);

	$: rootElement = getRootElement();
	$: isEnabled = isEnabled ?? true;
	$: isClientSide && isEnabled
		? enableStyle()
		: disableStyle();
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: if (rootElement) {
		rootElement.style = makeStyleVars(theme);
	}
</script>

<div></div>

<style>
	div {
		display: none;
	}
	:global(.styledScrollbar *::-webkit-scrollbar) {
		width: var(--trackWidth);
	}
	:global(.styledScrollbar *::-webkit-scrollbar-track) {
		background-color: none;
	}
	:global(.styledScrollbar *::-webkit-scrollbar-track:hover) {
		background-color: var(--trackColor);
		border-left: thin solid var(--trackBorderColor);
	}
	:global(.styledScrollbar *::-webkit-scrollbar-thumb) {
		background-color: var(--thumbColor);
		border-radius: var(--thumbRadius);
	}
</style>
