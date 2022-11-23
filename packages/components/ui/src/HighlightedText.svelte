<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {isRegexpNotEmpty} from '@svizzle/utils';
	import * as _ from 'lamb';
	import {tick} from 'svelte';

	const defaultString = '';

	const defaultTheme = {
		colorHighlightedBackground: 'yellow',
		colorHighlightedText: 'black'
	};

	export let regex;
	export let shouldScroll = false;
	export let string = defaultString;
	export let theme;

	const splitText = (text, regExp) => {
		let pairs = [[text, '']];

		if (regExp && isRegexpNotEmpty(regExp)) {
			const remains = text.split(regExp);

			if (remains.length > 1) {
				const matches = text.match(regExp)?.concat('');
				pairs = _.zip(remains, matches);
			}
		}

		return pairs;
	};

	const scrollIntoView = async () => {
		await tick();
		const targetElement = document.getElementById('highlighted-0');
		if (targetElement) {
			if (targetElement.scrollIntoViewIfNeeded) {
				targetElement.scrollIntoViewIfNeeded(); // Chrome/Safari/Edge
			} else {
				targetElement.scrollIntoView(); // FF
			}
		}
	};

	$: string = string || defaultString;
	$: parts = splitText(string, regex);
	$: theme = {...defaultTheme, ...theme};
	$: style = makeStyleVars(theme);
	$: string && regex && shouldScroll && scrollIntoView();
</script>

{#each parts as [normal, styled], i}{normal}{#if styled}<span {style} id='highlighted-{i}' class='highlighted'>{styled}</span>{/if}{/each}

<style>
	span {
		background-color: 'inherit';
		color: 'inherit';
	}
	.highlighted {
		background-color: var(--colorHighlightedBackground);
		color: var(--colorHighlightedText);
	}
</style>
