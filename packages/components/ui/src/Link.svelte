<script>
	import {makeStyleVars} from '@svizzle/dom';

	import ExternalLink from './icons/feather/ExternalLink.svelte';
	import Icon from './icons/Icon.svelte';

	const defaultIconSize = 14;
	const defaultRel = 'noopener';
	const {defaultStrokeWidth} = Icon;
	const defaultTheme = {
		iconStroke: 'rgb(16, 174, 249)',
		iconStrokeWidth: defaultStrokeWidth,
		textColor: 'black',
	};

	export let href = null;
	export let hreflang = null;
	export let iconSize = defaultIconSize;
	export let isDownload = false;
	export let isExternal = false;
	export let rel = defaultRel;
	export let target = null;
	export let text = null;
	export let theme = defaultTheme;
	export let type = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: href = href || null;
	$: hreflang = hreflang || null;
	$: iconSize = iconSize || defaultIconSize;
	$: isDownload = isDownload || false;
	$: isExternal = isExternal || false;
	$: rel = rel || defaultRel;
	$: target = target || null;
	$: text = !href
		? '<Link.svelte>: PLEASE PROVIDE A `href` PROP'
		: text ?? href;
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: type = type || null;

	$: style = makeStyleVars(theme);
</script>

<a
	{href}
	{hreflang}
	{rel}
	{style}
	{target}
	{type}
	download={isDownload}
>
	<span>{text}</span>
	{#if isExternal}
		<span>
			<Icon
				glyph={ExternalLink}
				size={iconSize}
				stroke={theme.iconStroke}
				strokeWidth={theme.iconStrokeWidth}
			/>
		</span>
	{/if}
</a>

<style>
	a {
		text-decoration: none;
	}

	a span:nth-child(1) {
		color: var(--textColor);
	}
	a span:nth-child(2) {
		margin-left: 0.1rem;
	}
</style>

<!--
See:
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
- https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
-->
