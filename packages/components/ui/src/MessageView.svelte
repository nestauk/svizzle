<script>
	export let backgroundColor = null;
	export let color = null;
	export let fontSize = null;
	export let text = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: text = text ?? 'Please provide a message';

	$: style = {
		'--backgroundColor': backgroundColor || 'white',
		'--color': color || 'black',
		'--fontSize': fontSize || '14px',
	};
</script>

<div class='MessageView' {style}>
	<span>{text}</span>
</div>

<style>
	.MessageView {
		align-items: center;
		background-color: var(--backgroundColor);
		color: var(--color);
		display: flex;
		font-size: var(--fontSize);
		height: 100%;
		justify-content: center;
		width: 100%;
	}
</style>
