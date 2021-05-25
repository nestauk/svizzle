<script>
	import Icon from './icons/Icon.svelte';
	import Loader from './icons/feather/Loader.svelte';

	export let fill = null;
	export let glyph = Loader;
	export let size = 50;
	export let stroke = null;
	export let strokeWidth = 0.75;
</script>

<div class='LoadingView'>
	<div class='spinner'>
		<Icon
			{fill}
			{glyph}
			{size}
			{stroke}
			{strokeWidth}
		/>
	</div>
</div>

<style>
	.LoadingView {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner {
		animation: rotation 2s infinite linear;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
</style>
