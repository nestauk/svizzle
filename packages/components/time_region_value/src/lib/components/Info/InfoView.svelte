<script>
	import {Download, LinkButton} from '@svizzle/ui';
	import * as _ from 'lamb';

	// lib/stores
	import {_theme} from '../../stores/theme.js';

	// lib/components/Info
	import PolymorphicString from './PolymorphicString.svelte';
	import PolymorphicURL from './PolymorphicURL.svelte';

	const formatDate = _.pipe([
		String,
		s => `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`
	]);

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

	$: date = data_date && formatDate(data_date);
</script>

<div class='InfoView'>
	<h2>About the data</h2>

	{#if description}
		<p class='longDesc'>{description}</p>
	{/if}

	{#if date}
		<p><b>Data downloaded on date:</b> {date}</p>
	{/if}

	<p>
		<b>Available years:</b> {year_extent[0]}
		{#if year_extent[0] !== year_extent[1]}
			- {year_extent[1]}
		{/if}
	</p>

	<p>
		<b>Region types:</b>
		{#if region_types.length > 1}
			<ui>
				{#each region_types as regionType, index}
					<li>{regionType}</li>
				{/each}
			</ui>
		{:else}
			<span>{region_types[0]}</span>
		{/if}
	</p>

	{#if is_experimental}
		<p>
			Note that this indicator is <b>experimental</b>.
		</p>
	{/if}

	{#if warning}
		<p>
			<b>Warning:</b>
			<span>{warning}</span>
		</p>
	{/if}

	{#if source_name}
		<PolymorphicString
			item={source_name}
			title='Source name'
		/>
	{/if}
	{#if source_url}
		<PolymorphicURL
			item={source_url}
			text={source_url}
			title='Source'
		/>
	{/if}
	{#if api_doc_url}
		<PolymorphicURL
			item={api_doc_url}
			text={api_doc_url}
			title='Source documentation'
		/>
	{/if}
	{#if endpoint_url}
		<PolymorphicURL
			item={endpoint_url}
			text={endpoint_url}
			title='Source data'
		/>
	{/if}
	{#if api_type}
		<PolymorphicString
			item={api_type}
			title='API type'
		/>
	{/if}
	{#if query}
		<PolymorphicString
			item={query}
			title='Query'
		/>
	{/if}
	{#if !_.isUndefined(is_experimental)}
		<PolymorphicString item={is_experimental} title='Experimental' />
	{/if}
	{#if !_.isUndefined(is_public) && !is_public}
		<p>
			<b>Access:</b>
			<span>The dataset originally used to create this indicator is not public. </span>
			{#if auth_provider}
				<span>Please contact {auth_provider} for more details about access.</span>
			{/if}
		</p>
	{/if}

	<div class='cta'>
		<LinkButton
			download
			glyph={Download}
			href={url}
			text='Download this indicator'
			theme={{backgroundColor: $_theme.colorMain}}
		/>
	</div>
</div>

<style>
	.InfoView {
		height: 100%;
		overflow-y: auto;
		width: 100%;
	}

	h2 {
		margin-bottom: 1rem;
	}

	.longDesc {
		margin-bottom: 1rem;
	}

	b {
		margin-right: 0.25rem;
	}

	.cta {
		margin-top: 2rem;
		display: flex;
		justify-content: space-around;
		align-content: center;
	}
</style>
