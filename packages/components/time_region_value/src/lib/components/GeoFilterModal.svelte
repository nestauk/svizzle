<script>
	// lib/stores
	import {
		_currentLevel,
		_focusedRoot,
		_focusedRootDescendants,
		_focusedRootId,
		_isMenuExpanded,
		_roots,
		deselectAllFocusedRootChildren,
		deselectAllRoots,
		focusRoot,
		selectAllFocusedRootChildren,
		selectAllRoots,
		toggleFocusedRootDescendant,
		toggleRoot,
	} from '../stores/selectedRegions.js';

	// lib/components
	import RegionsSelector from './RegionsSelector.svelte';

	const focusedRoot = ({detail: rootId}) => focusRoot(rootId);
	const toggledRoot = ({detail: rootId}) => toggleRoot(rootId);
	const toggledRegion = ({detail: regionId}) => toggleFocusedRootDescendant(regionId);
</script>

<div
	class='clickable modal'
	on:click
>
	<div
		class='panel'
		class:expanded={$_isMenuExpanded}
	>
		<div class='roots'>
			<RegionsSelector
				focusedId={$_focusedRootId}
				items={$_roots}
				on:deselectedAll={deselectAllRoots}
				on:focused={focusedRoot}
				on:selectedAll={selectAllRoots}
				on:toggled={toggledRoot}
				showFocusedItem={$_isMenuExpanded}
				title='Countries'
			/>
		</div>

		{#if $_isMenuExpanded}
			<div class='descendants'>
				<RegionsSelector
					items={$_focusedRootDescendants}
					on:deselectedAll={deselectAllFocusedRootChildren}
					on:selectedAll={selectAllFocusedRootChildren}
					on:toggled={toggledRegion}
					title='{$_currentLevel}: {$_focusedRoot.name}'
				/>
			</div>
		{/if}
	</div>

</div>

<style>
	.modal {
		background-color: rgba(255,255,255,0.25);
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	.panel {
		background-color: rgba(255,255,255,0.75);
		border: 1px solid var(--colorRefLight);
		box-shadow: var(--dimBoxShadowXY) var(--colorRefLight);
		cursor: auto;
		display: grid;
		grid-template-areas: 'roots';
		grid-template-columns: 100%;
		grid-template-rows: 100%;
		height: 100%;
		inset: 0;
		margin: auto;
		max-height: 80%;
		max-width: 300px;
		overflow-y: hidden;
		padding: 1rem;
		position: absolute;
	}
	.panel.expanded {
		grid-column-gap: 1em;
		grid-template-areas: 'roots descendants';
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 100%;
		max-width: 600px;
	}

	.roots {
		grid-area: roots;
	}
	.descendants {
		grid-area: descendants;
	}

	.clickable {
		cursor: pointer;
	}
</style>
