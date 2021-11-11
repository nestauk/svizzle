<script>
	import Icon from './icons/Icon.svelte';
	import XCircle from './icons/feather/XCircle.svelte';

	export let _screen;
	export let components;
	export let currentIndex;
	
	let isActive = false;

	function init () {
		currentIndex = 0;
		isActive = true;
	}

	function next () {
		currentIndex++;
		if (currentIndex >= components.length) {
			isActive = false;
		}
	}

	$: components?.length > 0 && init();
</script>

{#if isActive}
	<div
		aria-label="Banner"
		class='Banner {$_screen?.classes}'
		role='alert'
	>
		<div class='inner'>
			<div class='content'>
				<svelte:component this={components?.[currentIndex]} />
			</div>
			<button
				aria-label='Close banner'
				class='clickable'
				on:click={next}
			>
				<Icon glyph={XCircle} />
			</button>
		</div>
	</div>
{/if}

<style>
	.Banner {
		align-items: center;
		background-color: rgba(0, 0, 0, 0.25);
		box-shadow: var(--box-shadow-xy);
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: auto;
		position: fixed;
		left: 0;
		top: 0;
		user-select: none;
		z-index: var(--z-2000);
		width: 100%;
		height: 100%;
	}
	.inner {
		background-color: white;
		border-radius: 1rem;
		padding: 2rem;
		position: relative;
		max-height: 90%;
	}
	.content {
		height: 100%;
		overflow: auto;
	}
	.small .inner {
		width: 90%;
	}
	.medium .inner {
		min-width: 50%;
		width: min-content;
	}

	button {
		background: none;
		border: none;
		padding: 0.5rem;
		position: absolute;
		right: 0;
	}
	.small button {
		bottom: 0;
	}
	.medium button {
		bottom: initial;
		top: 0;
	}
</style>
