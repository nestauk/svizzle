<script>
	import ExternalLink from './icons/feather/ExternalLink.svelte';
	import Icon from './icons/Icon.svelte';
	import {defaultRel} from './utils/shared';

	const defaultIconSize = 14;
	const {defaultStrokeWidth} = Icon;
	const defaultTheme = {
		iconStroke: 'rgb(16, 174, 249)',
		iconStrokeWidth: defaultStrokeWidth,
		color: 'black',
	};

	export let download = null;
	export let href = null;
	export let hreflang = null;
	export let iconSize = defaultIconSize;
	export let isBold = false;
	export let isUnderlined = false;
	export let rel = defaultRel;
	export let showIcon = true;
	export let target = null;
	export let theme = null;
	export let type = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: download = download || null;
	$: href = href || null;
	$: hreflang = hreflang || null;
	$: iconSize = iconSize || defaultIconSize;
	$: isBold = isBold || false;
	$: isUnderlined = isUnderlined || false;
	$: rel = rel || defaultRel;
	$: showIcon = showIcon || true;
	$: target = target || null;
	$: type = type || null;

	$: isExternal = type === 'external';
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = theme.color ? `--color: ${theme.color}` : null;
</script>

<a
	download={download ? '' : null}
	{href}
	{hreflang}
	{rel}
	{style}
	{target}
	{type}
	class:underlined={isUnderlined}
>
	<span class:bold={isBold}>
		<slot/>
	</span>
	{#if isExternal && showIcon}
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
	a.underlined {
		text-decoration: underline var(--color);
	}

	a span:nth-child(1) {
		color: var(--color);
	}
	a span:nth-child(2) {
		margin-left: 0.1rem;
	}

	.bold {
		font-weight: bold;
	}
</style>

<!--
See:
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
- https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types
-->
