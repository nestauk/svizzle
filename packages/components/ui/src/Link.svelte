<script>
	import {makeStyleVars} from '@svizzle/dom';

	import {ExternalLink, Icon} from './icons/index.js';
	import {defaultRel} from './utils/shared.js';

	const defaultIconSize = 14;
	const {defaultStrokeWidth} = Icon;
	const defaultTheme = {
		color: 'inherit',
		iconStroke: 'rgb(16, 174, 249)',
		iconStrokeWidth: defaultStrokeWidth,
		outlineColor: 'black',
		outlineStyle: 'solid',
		outlineWidth: '1px',
	};

	export let ariaDescribedBy = null;
	export let ariaLabel = null;
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

	const disableSpaceToScroll = e => {
		if (e.keyCode === 32) {
			e.preventDefault()
		}
	}

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
	$: style = makeStyleVars(theme);
</script>

<a
	aria-describedby={ariaDescribedBy}
	aria-label={ariaLabel}
	download={download ? '' : null}
	{href}
	{hreflang}
	{rel}
	{style}
	{target}
	{type}
	class:underlined={isUnderlined}
	on:keydown={disableSpaceToScroll}
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

	a:focus-visible {
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor);
		outline-offset: calc(-1 * var(--outlineWidth));
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
