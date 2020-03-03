<script context="module">
	import {mapValues} from 'lamb';

	// eslint-disable-next-line consistent-return, no-unused-vars
	export async function preload({ params, query }) {
		const res = await this.fetch(`components/${params.slug}.json`);
		let data = await res.json();

		if (res.status === 200) {
			return {
				...data,
				props: data.props.map(({key, value, fnProps}) => ({
					key,
					value: mapValues(value, (v, k) =>
						// eslint-disable-next-line no-eval
						fnProps && fnProps.includes(k) ? eval(v) : v
					)
				}))
			};
		}

		this.error(res.status, data.message);
	}
</script>

<script>
	import {pairs, setIn} from 'lamb';
	import {makeKeyed} from '@svizzle/utils';
	import JSONTree from 'svelte-json-tree';

	import Elements from '../../components/Elements.svelte'; // FIXME move ../../../components to node_modules
	import components from './_components.js';

	const makeKeyedEmptyString = makeKeyed('');

	export let content;
	export let events;
	export let name;
	export let props;
	export let title;
	export let usage;
	export let slug;

	let instance;
	let current_props_index = 0

	$: component = components[name];
	$: payloads = events ? makeKeyedEmptyString(events) : null;
	$: current_props = props[current_props_index].value;
	$: displayProps = pairs(current_props);

	const makeEventHandler = eventName =>
		event => {
			payloads = setIn(payloads, eventName, JSON.stringify(event.detail));
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
			{#each pairs(payloads) as [key, value]}
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
