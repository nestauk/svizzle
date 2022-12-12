<script>
	import {makeStyleVars} from '@svizzle/dom';

	export let alignHorizontally;
	export let backgroundColor = null;
	export let color = null;
	export let fontSize = null;
	export let padding = null;
	export let textAlign = null;

	$: style = makeStyleVars({
		backgroundColor: backgroundColor || 'white',
		color: color || 'black',
		fontSize: fontSize || '14px',
		padding: padding || '0',
		textAlign: textAlign || 'start'
	});
	$: centerStyle = alignHorizontally ? 'flex-direction: row' : null;
</script>

<div
	{style}
	class='CenteredView'
>
	<div
		class='center'
		style={centerStyle}
	>
		<slot />
	</div>
</div>

<style>
	.CenteredView {
		align-items: center;
		background-color: var(--backgroundColor);
		color: var(--color);
		display: flex;
		font-size: var(--fontSize);
		height: 100%;
		justify-content: center;
		padding: var(--padding);
		text-align: var(--textAlign);
		width: 100%;
	}

	.center {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
