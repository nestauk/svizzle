<script context="module">
	// eslint-disable-next-line no-unused-vars
	export function preload({ params, query }) {
		return params;
	}
</script>

<script>
	import * as _ from 'lamb';
	import {indexValuesWith, makeKeyed} from '@svizzle/utils';
	import JSONTree from 'svelte-json-tree';

	import Elements from '../../components/Elements.svelte'; // FIXME move ../../../components to node_modules
	import components from './_components.js';
	import * as examples from './_examples';

	const makeKeyedEmptyString = makeKeyed('');
	const makeLookup = indexValuesWith(_.getKey('slug'));
	const lookup = makeLookup(examples);

	export let slug;

	let instance;
	let current_props_index = 0;

	$: ({
		props,
		content,
		events,
		name,
		title,
		usage,
	} = lookup[slug]);

	$: component = components[name];
	$: payloads = events ? makeKeyedEmptyString(events) : null;
	$: current_props = props[current_props_index].value;
	$: displayProps = _.pairs(current_props);

	const makeEventHandler = eventName =>
		event => {
			payloads = _.setIn(payloads, eventName, JSON.stringify(event.detail));
		};

	let eventRemovers = [];
	$: if (slug && instance) {
		eventRemovers.forEach(remove => remove());
		eventRemovers = [];

		events && events.forEach(eventName => {
			const eventHandler = makeEventHandler(eventName);
			const eventRemover = instance.$on(eventName, eventHandler);
			eventRemovers.push(eventRemover);
		});
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main>
	<h1>{title}</h1>
	<div class="col col1">
		<div class="distancer">
			<Elements elements={content} />
		</div>
		<div class="distancer">
			<h2>Usage</h2>
			<pre>{usage}</pre>
		</div>
		{#if payloads}
		<h2>Events</h2>
		<div class="distancer">
			{#each _.pairs(payloads) as [key, value]}
			<div class="row">
				<span>{key}</span>
				<pre>{value || '[payload]'}</pre>
			</div>
			{/each}
		</div>
		{/if}
		<div class="distancer">
			<h2>Props</h2>
			{#if props.length > 1}
			<div class="distancer">
				{#each props as {key, value}, index}
				<button
					class:active='{current_props_index === index}'
					on:click='{ () => { current_props_index = index } }'
				>{key}</button>
				{/each}
			</div>
			{/if}
			{#each displayProps as [propName, propValue]}
			<h3><code>{propName}</code></h3>
			<div class="distancer">
				<JSONTree value={propValue} />
			</div>
			{/each}
		</div>
	</div>
	<div class="col col2">
		<svelte:component
			bind:this={instance}
			this={component}
			{...current_props}
		/>
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-rows: 3rem calc(100% - 3rem);
		height: 100%;
		width: 100%;
	}

	h1 {
		grid-column: 1 / span 2;
		grid-row: 1 / span 1;
		margin: 0;
		width: 100%;
	}

	.col {
		grid-row: 2 / span 1;
		padding: var(--dim-padding-minor);
	}
	.col1 {
		grid-column: 1 / span 1;
		overflow-y: auto;
	}

	.distancer {
		margin-bottom: 1rem;
	}

	.row {
		display: flex;
		align-items: center;
		width: 100%;
		height: 2rem;
		margin-bottom: 1rem;
	}

	.row span:nth-child(1) {
		flex: 0 0 15%;
	}
	.row span:nth-child(2) {
		flex: 1;
	}

	button {
		padding: 0.5rem;
		margin-right: 0.5rem;
		font-size: 1.05rem;
	}

	button.active {
		background-color: var(--color-main);
		color: white;
		outline: 0 none; /* used for accessibility FIXME */
	}

	pre {
		width: 100%;
	}

	.col2 {
		grid-column: 2 / span 1;
		border: 1px solid var(--color-main);
	}
</style>
