<script>
	import {makeStyleVars} from '@svizzle/dom';

	import Clipboard from './icons/feather/Clipboard.svelte';
	import Copy from './icons/feather/Copy.svelte';
	import Icon from './icons/Icon.svelte';

	export let getText;
	export let theme;

	const defaultTheme = {
		background: 'inherit',
		color: 'inherit',
		failureColor: 'red',
		outlineColor: 'black',
		outlineStyle: 'solid',
		outlineWidth: '1px',
		successColor: 'green',
	}

	let isTextCopyRecentlyFailed = false;
	let isTextRecentlyCopied = false;

	const copy = () => {
		const text = getText();
		if (text && navigator.clipboard) {
			// FIXME Only uses clipboard if available, but always notifies success
			navigator.clipboard?.writeText(text);
			isTextRecentlyCopied = true;
			setTimeout(() => {
				isTextRecentlyCopied = false
			}, 2000);
		} else {
			isTextCopyRecentlyFailed = true;
			setTimeout(() => {
				isTextCopyRecentlyFailed = false
			}, 2000);
		}
	};

	$: getText = getText || (() => '');
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);
</script>

<button
	{style}
	on:click={copy}
>
	{#if isTextRecentlyCopied}
		<Icon
			glyph={Clipboard}
			stroke={theme.successColor}
		/>
	{:else if isTextCopyRecentlyFailed}
		<Icon
			glyph={Clipboard}
			stroke={theme.failureColor}
		/>
	{:else}
		<Icon glyph={Copy} />
	{/if}
</button>

<style>
	button {
		background: var(--background);
		border: none;
		color: var(--color);
		cursor: pointer;
		display: block;
	}
	button:focus {
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor);
		outline-offset: calc(-1 * var(--outlineWidth));
	}
</style>
