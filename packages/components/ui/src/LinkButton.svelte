<script>
	import {makeStyleVars} from '@svizzle/dom';

	import Icon from './icons/Icon.svelte';
	import {defaultRel} from './utils/shared.js';

	const {
		defaultFill,
		defaultSize,
		defaultStroke,
		defaultStrokeWidth
	} = Icon;
	const defaultText = 'Please provide `text`';
	const defaultTheme = {
		backgroundColor: 'black',
		boxShadowColor: 'lightgrey',
		boxShadowVec: '2px 8px 9px -4px',
		iconFill: defaultFill,
		iconStroke: defaultStroke,
		iconStrokeWidth: defaultStrokeWidth,
		textColor: 'white',
	};
	const missingHrefText = 'Please provide `href`';

	export let download = null;
	export let glyph = null;
	export let href = null;
	export let hreflang = null;
	export let iconSize = defaultSize;
	export let rel = defaultRel;
	export let target = null;
	export let text = defaultText;
	export let theme = null;
	export let type = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: rel = rel || defaultRel;
	$: download = download || null;
	$: href = href || null;
	$: hreflang = hreflang || null;
	$: iconSize = iconSize || defaultSize;
	$: style = makeStyleVars(theme);
	$: target = target || null;
	$: text = text || defaultText;
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: type = type || null;
</script>

<div
	{style}
	class='linkButton'
>
	{#if href}
		<a
			download={download ? '' : null}
			{href}
			{hreflang}
			{rel}
			{target}
			{type}
		>
			<div class="clickable">
				{#if text}
					<span>{text}</span>
				{/if}
				{#if glyph}
					<span>
						<Icon
							{glyph}
							fill={theme.iconFill}
							size={iconSize}
							stroke={theme.iconStroke}
							strokeWidth={theme.iconStrokeWidth}
						/>
					</span>
				{/if}
			</div>
		</a>
	{:else}
		<div>
			{#if text}
				<span>{missingHrefText}</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.linkButton {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.linkButton a {
		border-bottom: none;
		text-decoration: none;
	}
	.linkButton div {
		font-weight: bold;
		background-color: var(--backgroundColor);
		color: var(--textColor);
		padding: 1rem;
		font-size: 1.2em;
		box-shadow: var(--boxShadowVec) var(--boxShadowColor);
	}
	.linkButton div {
		display: flex;
		align-items: center;
	}
	.linkButton div span:nth-child(2) {
		margin-left: 1rem;
	}
	.linkButton div.clickable {
		cursor: pointer;
	}
</style>
