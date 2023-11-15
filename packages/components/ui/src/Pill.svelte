<script>
	import {makeStyleVars} from '@svizzle/dom';

	export let label = null;
	export let isBold;
	export let nowrap;
	export let theme;

	const defaultTheme = {
		backgroundColor: 'white',
		border: 'thin solid black',
		fontSize: '1em',
		textColor: 'black',
	}

	$: nowrap = nowrap ?? true;
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: style = makeStyleVars(theme);
</script>

<div
	class='Pill'
	{style}
>
	<span
		class:bold={isBold}
		class:nowrap
		class='label'
	>{label}</span>
</div>

<style>
	.Pill {
		align-items: center;
		background-color: var(--backgroundColor);
		border-radius: 50vh;
		border: var(--border);
		color: var(--textColor);
		display: flex;
		padding: 0.2em 0.4em;
		text-align: center;
		user-select: none;
	}

	.label {
		font-size: var(--fontSize);
		margin: 0 0.3em;
		overflow: hidden;
	}
	.bold {
		font-weight: bold;
	}
	.nowrap {
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
