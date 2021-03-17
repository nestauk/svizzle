<script>
	import {makeStyleVars} from '@svizzle/dom';

	import Icon from './icons/Icon.svelte';

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

	export let glyph = null;
	export let href = null;
	export let iconSize = defaultSize;
	export let text = defaultText;
	export let theme = defaultTheme;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: iconSize = iconSize || defaultSize;
	$: style = makeStyleVars(theme);
	$: text = text || defaultText;
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
</script>

<div
	{style}
	class='linkButton'
>
	{#if href}
		<a {href}>
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
		font-size: 1.2rem;
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
