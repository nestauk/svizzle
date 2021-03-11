<script>
	import ExternalLink from './icons/feather/ExternalLink.svelte';
	import Icon from './icons/Icon.svelte';

	export let href = null;
	export let size = 14;
	export let text = '';

	$: size = size || 14;
	$: text = text || '';
</script>

<a {href} target='_blank'>
	<span>{text}</span>
	<span>
		<Icon
			{size}
			stroke='rgb(16, 174, 249)'
		>
			<ExternalLink />
		</Icon>
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
