<script>
	import {Link} from '@svizzle/ui';
	import {onMount} from 'svelte';

	// lib/stores
	import {setGroups} from '../stores/dataset.js';
	import {_hrefBase} from '../stores/navigation.js';
	import {_theme} from '../stores/theme.js';

	// lib/utils
	import {makeURL} from '../utils/url.js';

	export let _groups = null;
	export let currentId = null;

	let currentNode;
	let scrollable;
	let scrollableHeight;

	onMount(() => {
		currentNode && currentNode.scrollIntoView({
			block: 'nearest',
			behavior: 'smooth'
		});
	});

	$: _groups && setGroups($_groups);

	// eslint-disable-next-line no-shadow,no-unused-vars
	function keepOnScreen (node, {id, currentId, scrollableHeight}) {
		if (id === currentId) {
			currentNode = node;
		}

		return {
			// eslint-disable-next-line no-shadow,no-unused-vars
			update ({id, currentId, scrollableHeight}) {
				if (id === currentId) {
					const {y: Y} = scrollable.getBoundingClientRect();
					const {y} = node.getBoundingClientRect();
					const yRel = y - Y;

					if (yRel < 0 || yRel > scrollableHeight) {
						scrollable.scrollTo({
							top: yRel,
							behavior: 'smooth'
						});
					}
				}
			}
		};
	}
</script>

<nav
	bind:clientHeight={scrollableHeight}
	bind:this={scrollable}
>
	{#each $_groups as {label, indicators}}
		<div class='group'>
			<header>{label}</header>
			{#each indicators as {title, schema}}
				<Link
					href={makeURL($_hrefBase, schema.value.id)}
					rel='prefetch'
					theme={{color: $_theme.colorWhite}}
				>
					<p
						class:selected='{schema.value.id === currentId}'
						use:keepOnScreen={{
							id: schema.value.id,
							currentId,
							scrollableHeight
						}}
					>
					{title}
					</p>
				</Link>
			{/each}
		</div>
	{/each}
</nav>

<style>
	nav {
		height: 100%;
		width: 100%;
		padding: var(--dimPadding);
		overflow-y: auto;

		background-color: var(--colorMain);
		color: var(--colorWhite);
		font-weight: var(--dimFontWeight);
	}

	nav .group:not(:last-child) {
		margin-bottom: 1rem;
	}
	nav .group:not(:first-child) {
		margin-top: 1rem;
	}

	nav header {
		font-size: 1.2em;
		font-weight: bold;
		margin-bottom: 1rem;
	}
	nav p {
		display: flex;
		align-items: center;
		padding: 0.4rem;
		margin-bottom: 0.5rem;
	}
	nav p.selected {
		background-color: var(--colorMainDesat) !important;
	}
	nav p:hover {
		cursor: pointer;
		background-color: var(--colorSelectedDesat);
	}
</style>
