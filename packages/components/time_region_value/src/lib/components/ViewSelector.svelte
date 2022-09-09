<script>
	import {
		Activity,
		BarChart,
		Clock,
		Icon,
		Info,
		List,
		MapPin,
		Settings,
	} from '@svizzle/ui';
	import {truthynessTo} from '@svizzle/utils';
	import * as _ from 'lamb';

	const makeStrokes = _.mapValuesWith(truthynessTo(['black', 'grey']));

	export let _routes = null;
	export let _views = null;
	export let showView = null;

	$: strokes = makeStrokes($_views);
</script>

<nav
	class:id={$_routes.Id}
	class:year={$_routes.IdYear}
	class='ViewSelector'
>
	<div
		class='button clickable'
		on:click={showView('sidebar')}
	>
		<Icon
			glyph={List}
			stroke={strokes.sidebar}
		/>
	</div>

	{#if $_routes.Index}
		<div
			class='button clickable'
			on:click={showView('distribution')}
		>
			<Icon
				glyph={Clock}
				stroke={strokes.distribution}
			/>
		</div>
	{:else if $_routes.Id}
		<div
			class='button clickable'
			on:click={showView('trends')}
		>
			<Icon
				glyph={Activity}
				stroke={strokes.trends}
			/>
		</div>
	{:else if $_routes.IdYear}
		<div
			class='button clickable'
			on:click={showView('map')}
		>
			<Icon
				glyph={MapPin}
				stroke={strokes.map}
			/>
		</div>
		<div
			class='button clickable rotated'
			on:click={showView('barchart')}
		>
			<Icon
				glyph={BarChart}
				stroke={strokes.barchart}
			/>
		</div>
	{/if}

	{#if $_routes.Id || $_routes.IdYear}
		<div
				class='button clickable'
				on:click={showView('info')}
			>
				<Icon
					glyph={Info}
					stroke={strokes.info}
				/>
		</div>
		<div
			class='button clickable'
			on:click={showView('settings')}
		>
			<Icon
				glyph={Settings}
				stroke={strokes.settings}
			/>
		</div>
	{/if}
</nav>

<style>
	.ViewSelector {
		background-color: white;
		border-top: 1px solid var(--colorMain);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 100%;
		height: 100%;
		width: 100%;
	}

	.ViewSelector.id {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
	.ViewSelector.year {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	.button {
		align-self: center;
		justify-self: center;
		cursor: pointer;
	}
	.rotated {
		transform: scaleX(-1) rotate(-90deg);
	}

	.clickable {
		cursor: pointer;
	}
</style>
