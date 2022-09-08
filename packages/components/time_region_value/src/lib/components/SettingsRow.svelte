<script>
	import Icon from '@svizzle/ui/src/icons/Icon.svelte';
	import ChevronDown from '@svizzle/ui/src/icons/feather/ChevronDown.svelte';
	import ChevronUp from '@svizzle/ui/src/icons/feather/ChevronUp.svelte';
	import Globe from '@svizzle/ui/src/icons/feather/Globe.svelte';
	import Switch from '@svizzle/ui/src/Switch.svelte';

	// lib/stores
	import {
		_colorSchemeLabel,
		_colorSchemeLabels,
		toggleColorScheme
	} from '../stores/colors.js';
	import {_availableLevels} from '../stores/regionSettings.js';
	import {_currentLevel} from '../stores/selectedRegions.js';
	import {_theme} from '../stores/theme.js';

	// lib/components
	import XorSelector from './XorSelector.svelte';

	const defaultHandlers = {
		setLevel: null,
		toggledFiltering: null,
		toggledGeoModal: null,
		toggledRanking: null,
	}

	export let flags = {
		doFilter: false,
		isGeoModalVisible: false,
		isRegionsSelectionDirty: false,
		showRankingControl: false,
	}
	export let handlers = defaultHandlers;

	// FIXME https://github.com/sveltejs/svelte/issues/4442
	$: handlers = handlers ? {...defaultHandlers, ...handlers} : defaultHandlers;

	$: globeStroke = flags.isRegionsSelectionDirty
		? $_theme.colorSelected
		: $_theme.colorRef;
</script>

<div class='SettingsRow'>
	<!-- geo selection -->
	<div class='optgroup'>
		<div
			class='item globe clickable'
			on:click={handlers.toggledGeoModal}
		>
			<Icon
				glyph={Globe}
				size={28}
				stroke={globeStroke}
				strokeWidth={1.5}
			/>
			<Icon
				glyph={flags.isGeoModalVisible ? ChevronUp : ChevronDown}
				size={24}
				strokeWidth={1}
			/>
		</div>

		<div class='item'>
			<Switch
				on:toggled={handlers.toggledFiltering}
				value={flags.doFilter ? 'Filter' : 'Highlight'}
				values={['Highlight', 'Filter']}
			/>
		</div>

		<div class='item clickable'>
			<XorSelector
				on:changed={handlers.setLevel}
				value={$_currentLevel}
				values={$_availableLevels}
			/>
		</div>
	</div>

	<!-- ranking -->
	{#if flags.showRankingControl}
		<div class='optgroup'>
			<Switch
				on:toggled={handlers.toggledRanking}
				value='Absolute'
				values={['Absolute', 'Ranking']}
			/>
		</div>
	{/if}

	<!-- color scale -->
	<div class='optgroup'>
		<Switch
			on:toggled={toggleColorScheme}
			value={$_colorSchemeLabel}
			values={$_colorSchemeLabels}
		/>
	</div>
</div>

<style>
	.SettingsRow {
		align-items: center;
		display: flex;
		height: 100%;
		justify-content: space-between;
		width: 100%;
	}
	.SettingsRow > div:not(:last-child) {
		margin-right: 0.5rem;
	}

	.globe {
		border: 1px solid var(--colorRefLight);
		padding: 0.25rem;
	}
	.item:not(:last-child) {
		margin-right: 0.5rem;
	}
	.optgroup {
		display: flex;
		align-items: center;
		padding: 0.25rem;
	}

	.clickable {
		cursor: pointer;
	}
</style>
