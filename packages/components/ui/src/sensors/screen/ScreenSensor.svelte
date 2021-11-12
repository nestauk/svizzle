<script context='module'>
	import {writable} from 'svelte/store';

	export const _screen = writable();
	export const defaultBreakpoints = [45, 90, 135, 180];
</script>

<script>
	import * as _ from 'lamb';
	import {
		getTruthyValuesKeys,
		joinWithBlank,
		mergeObjects
	} from '@svizzle/utils';

	const makeClasses = _.pipe([
		mergeObjects,
		getTruthyValuesKeys,
		joinWithBlank
	]);

	export let fontSize = null;
	export let isDev = false;
	export let sampleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	export let breakpoints = defaultBreakpoints;

	let innerHeight;
	let innerWidth;
	let sampleHeight;
	let sampleWidth;

	$: sampleLength = sampleText.length;

	const updateScreen = () => {
		if (isServerSide) {
			return
		}

		// geometry

		const display = {
			aspectRatio: window.innerWidth / window.innerHeight,
			height: window.innerHeight,
			orientation: window.screen.orientation,
			pixelRatio: window.devicePixelRatio,
			width: window.innerWidth,
		};

		const glyph = {
			width: sampleWidth / sampleLength,
			height: sampleHeight,
		}

		const text = {
			maxChars: Math.floor(display.width / glyph.width),
			maxLines: Math.floor(display.height / glyph.height),
		}

		// flags

		const orientations = {
			landscape: display.aspectRatio >= 1,
			portrait: display.aspectRatio < 1,
		};

		const sizes = {
			xSmall: text.maxChars < breakpoints[0],
			small: true,
			medium: text.maxChars >= breakpoints[1],
			large: text.maxChars >= breakpoints[2],
			xLarge: text.maxChars >= breakpoints[3],
		};

		// update

		_screen.set({
			classes: makeClasses([sizes, orientations]),
			display,
			glyph,
			orientations,
			sizes,
			text,
		});
	}

	$: isServerSide = typeof window === 'undefined';
	$: sampleHeight && sampleWidth && updateScreen();
	$: fontSize && updateScreen();
	$: devInfo = $_screen && {
		Classes: $_screen.classes,
		Display: `${$_screen.display.width} x ${$_screen.display.height} px`,
		DPPR: $_screen.display.pixelRatio.toPrecision(4),
		Orientation: $_screen.display.aspectRatio > 1 ? 'landscape' : 'portrait',
		Text: `${$_screen.text.maxChars} x ${$_screen.text.maxLines} chars`
	};
</script>

<svelte:window
	bind:innerWidth={innerWidth}
	bind:innerHeight={innerHeight}
	on:resize={updateScreen}
/>

<div class='textSample'>
	<span
		bind:offsetWidth={sampleWidth}
		bind:offsetHeight={sampleHeight}
		style={fontSize && `font-size: ${fontSize}` }
	>{sampleText}</span>
</div>

{#if isDev && sampleHeight && sampleWidth && devInfo}
	<div class='devInfo'>
		<p>DPPR: {devInfo.DPPR}</p>
		<p>Display: {devInfo.Display}</p>
		<p>Text: {devInfo.Text}</p>
		<p>Classes: {devInfo.Classes}</p>
		<p>Orientation: {devInfo.Orientation}</p>
		<button on:click={() => {isDev = false}}>Close</button>
	</div>
{/if}

<style>
	.textSample {
		background: blue;
		left: 0;
		overflow: hidden;
		pointer-events: none;
		position: fixed;
		top: 0;
		visibility: hidden;
		width: 0;
	}
	.textSample span {
		display: block;
		width: max-content;
	}
	.devInfo {
		background-color: white;
		border: 1px solid darkgrey;
		box-shadow: 2px 2px 2px grey;
		left: 25vw;
		padding: 0.5em;
		position: absolute;
		top: 4em;
		width: 50vw;
		z-index: 1000;
	}
	button {
		padding: 0.25rem;
	}
</style>
