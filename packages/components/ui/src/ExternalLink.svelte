<script>
	import {makeStyleVars} from '@svizzle/dom';

	import ExternalLink from './icons/feather/ExternalLink.svelte';
	import Icon from './icons/Icon.svelte';

	const {defaultStrokeWidth} = Icon;
	const defaultTheme = {
		iconStroke: 'rgb(16, 174, 249)',
		iconStrokeWidth: defaultStrokeWidth,
		textColor: 'black',
	};
	const defaultIconSize = 14;

	export let href = null;
	export let iconSize = defaultIconSize;
	export let text = '';
	export let theme = defaultTheme;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: href = href || null;
	$: iconSize = iconSize || defaultIconSize;
	$: style = makeStyleVars(theme);
	$: text = text || '';
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
</script>

<a
	{href}
	{style}
	target='_blank'
>
	<span>{text}</span>
	<span>
		<Icon
			glyph={ExternalLink}
			size={iconSize}
			stroke={theme.iconStroke}
			strokeWidth={theme.iconStrokeWidth}
		/>
	</span>
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
