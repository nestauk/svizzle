<script>
	import IconExternalLink from './icons/IconExternalLink.svelte';

	export let href = null;
	export let size = 14;
	export let text = '';

	$: size = size || 14;
	$: text = text || '';
</script>

<a {href} target='_blank'>
	<span>{text}</span>
	<span>
		<IconExternalLink
			{size}
			stroke='rgb(16, 174, 249)'
		/>
	</span>
</a>

<style>
	a {
		text-decoration: none;
	}

	a span:nth-child(2) {
		margin-left: 0.1rem;
	}
</style>
