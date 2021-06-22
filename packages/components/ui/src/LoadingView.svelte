<script>
	import Icon from './icons/Icon.svelte';
	import Loader from './icons/feather/Loader.svelte';

	export let fill = null;
	export let glyph = Loader;
	export let message = null;
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
	{#if message}
		<div>
			<span>{message}</span>
		</div>
	{/if}
</div>

<style>
	.LoadingView {
		align-items: center;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		width: 100%;
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
