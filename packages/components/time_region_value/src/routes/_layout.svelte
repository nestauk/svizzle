<script>
	import {onMount} from 'svelte';
	import {makeStyleVars} from '@svizzle/dom';

	import Timeline from 'components/Timeline.svelte';
	import {setGroupsStore} from 'stores/data';
	import {timelineHeightStore, timelineWidthStore} from 'stores/layout';
	import {availableYearsStore, selectedYearStore} from 'stores/selection';
	import defaultTheme from 'shared/theme';

	export let goTo = null; // pass `@sapper/app`'s `goto`
	export let groupsStore;
	export let hrefBase = '';
	export let segment;
	export let theme = defaultTheme;

	let current;
	let scrollable;
	let scrollableHeight;

	onMount(() => {
		current && current.scrollIntoView({
			block: 'nearest',
			behavior: 'smooth'
		});
	});

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;

	$: style = makeStyleVars(theme);
	$: groupsStore && setGroupsStore($groupsStore);

	// eslint-disable-next-line no-shadow,no-unused-vars
	function keepOnScreen(node, {id, segment, scrollableHeight}) {
		if (id === segment) {
			current = node;
		}

		return {
			// eslint-disable-next-line no-shadow,no-unused-vars
			update({id, segment, scrollableHeight}) {
				if (id === segment) {
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

<section
	{style}
	class='time_region_value_layout'
>
	<nav
		bind:this={scrollable}
		bind:clientHeight={scrollableHeight}
	>
		{#each $groupsStore as {label, indicators}}
			<div class='group'>
				<h2>{label}</h2>
				{#each indicators as {title, schema}}
					<a
						rel='prefetch'
						href='{hrefBase}/{schema.value.id}'
					>
						<p
							class:selected='{schema.value.id === segment}'
							use:keepOnScreen={{
								id: schema.value.id,
								segment,
								scrollableHeight
							}}
						>
						{title}
						</p>
					</a>
				{/each}
			</div>
		{/each}
	</nav>
	<section class='content'>
		<section>
			<slot>No child component was provided</slot>
		</section>
		<nav
			bind:clientHeight={$timelineHeightStore}
			bind:clientWidth={$timelineWidthStore}
		>
			<Timeline
				{goTo}
				availableYears={$availableYearsStore}
				height={$timelineHeightStore}
				indicatorId={segment}
				selectedYear={$selectedYearStore}
				width={$timelineWidthStore}
				{hrefBase}
			/>
		</nav>
	</section>
</section>

<style>
	.time_region_value_layout {
		height: 100%;
		width: 100%;

		display: grid;
		grid-template-columns: var(--dimSidebarWidth) calc(100% - var(--dimSidebarWidth));
		grid-template-rows: 100%;
	}

	/* sidebar */

	nav {
		height: 100%;
		width: 100%;
		padding: var(--dimPadding);
		overflow-y: auto;

		background-color: var(--colorMain);
		border-right: 1px solid var(--colorMainLighter);
		color: var(--colorWhite);
		font-weight: var(--dimFontWeight);
	}

	nav .group:not(:last-child) {
		margin-bottom: 1rem;
	}
	nav .group:not(:first-child) {
		margin-top: 1rem;
	}

	nav h2 {
		font-family: var(--fontFamilySemibold), sans-serif;
		margin-bottom: 1rem;
	}
	nav a {
		text-decoration: none;
	}
	nav p {
		line-height: 1.5rem;
		display: flex;
		align-items: center;
		padding: 0.4rem;
		margin-bottom: 0.5rem;
	}
	nav p.selected {
		background-color: var(--colorMainDesat) !important;
		font-family: var(--fontFamilyRegular), sans-serif;
	}
	nav p:hover {
		cursor: pointer;
		background-color: var(--colorSelectedDesat);
	}

	/* content */

	.content {
		display: grid;
		grid-template-rows: calc(100% - 60px) 60px;
		grid-template-columns: 100%;
	}
	.content section {
		height: 100%;
		width: 100%;
		padding: var(--dimPadding) var(--dimPadding) 0 var(--dimPadding);
	}
	.content nav {
		height: 100%;
		width: 100%;
		background-color: var(--colorNav) !important;
		padding: 0 var(--dimPadding);
	}
</style>
