<script>
	import CenteredView from './CenteredView.svelte';

	export let backgroundColor = null;
	export let color = null;
	export let fontSize = null;
	export let padding = null;
	export let text = null;
	export let textAlign = null;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: text = text ?? 'Please provide a message';
</script>

<CenteredView
	{backgroundColor}
	{color}
	{fontSize}
	{padding}
	{textAlign}
>
	<span>{text}</span>
</CenteredView>
