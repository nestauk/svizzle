<script>
	import {noop} from '@svizzle/utils';

	// lib/components/Info
	import InfoView from './InfoView.svelte';

	export let api_doc_url = null;
	export let api_type = null;
	export let auth_provider = null;
	export let data_date = null;
	export let description = null;
	export let endpoint_url = null;
	export let is_experimental = null;
	export let is_public = null;
	export let query = null;
	export let region_types = null;
	export let source_name = null;
	export let source_url = null;
	export let url = null;
	export let warning = null;
	export let year_extent = null;
</script>

<div class='modal' on:click>
	<div
		class='panel'
		on:click|stopPropagation={noop}
	>
		<InfoView
			{api_doc_url}
			{api_type}
			{auth_provider}
			{data_date}
			{description}
			{endpoint_url}
			{is_experimental}
			{is_public}
			{query}
			{region_types}
			{source_name}
			{source_url}
			{url}
			{warning}
			{year_extent}
		/>
	</div>
</div>

<style>
	.modal {
		align-items: center;
		background-color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		display: flex;
		height: 100%;
		justify-content: space-around;
		position: absolute;
		width: 100%;
	}

	.panel {
		background-color: white;
		border: 1px solid var(--colorRefLight);
		box-shadow: var(--dimBoxShadowXY) var(--colorRefLight);
		cursor: auto;
		max-height: 80%;
		max-width: 800px;
		overflow-y: auto;
		padding: 1.5rem;
	}
</style>
