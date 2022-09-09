<script>
	import {
		CheckSquare,
		ChevronRight,
		Icon,
		MinusSquare,
		Square,
	} from '@svizzle/ui';
	import {noop} from '@svizzle/utils';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = null;
	export let items = [];
	export let focusedId = null;
	export let showFocusedItem = false;

	const focused = id => () => dispatch('focused', id);
	const toggledAndFocused = id => () => {
		dispatch('toggled', id);
		dispatch('focused', id);
	}
	const selectedAll = () => dispatch('selectedAll');
	const deselectedAll = () => dispatch('deselectedAll');
</script>

<div
	class='RegionsSelector'
	on:click|stopPropagation={noop}
>
	<!-- title -->

	{#if title}
		<h2>{title}</h2>
	{/if}

	<ul class='items'>
		<!-- items -->

		{#each items as {id, name, status}}
			<li>
				<!-- checkbox -->

				<span
					class='checker clickable'
					on:click={toggledAndFocused(id)}
				>
					{#if status === 1}
						<Icon
							glyph={CheckSquare}
							size={20}
						/>
					{:else if status === 0}
						<Icon
							glyph={Square}
							size={20}
						/>
					{:else if status === -1}
						<Icon
							glyph={MinusSquare}
							size={20}
						/>
					{/if}
				</span>

				<!-- item -->

				<span
					class='item'
					class:clickable={showFocusedItem}
					class:focused={id === focusedId}
					on:click={focused(id)}
				>
					{name}
				</span>

				<!-- focused item arrow -->

				{#if showFocusedItem}
					<span class='chevron'>
						{#if id === focusedId}
							<Icon
								glyph={ChevronRight}
								size={20}
							/>
						{/if}
					</span>
				{/if}
			</li>
		{/each}
	</ul>

		<!-- select all -->

	<ul>
		<li
			class='end sep clickable'
			on:click={selectedAll}
		>
			<span>Select all</span>
			<span class='checker'>
				<Icon
					glyph={CheckSquare}
					size={20}
					stroke='palegreen'
				/>
			</span>
		</li>

		<!-- deselect all -->

		<li
			class='end clickable'
			on:click={deselectedAll}
		>
			<span>Deselect all</span>
			<span class='checker'>
				<Icon
					glyph={Square}
					size={20}
					stroke='red'
				/>
			</span>
		</li>
	</ul>
</div>

<style>
	.RegionsSelector {
		cursor: auto;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	ul {
		width: 100%;
	}
	h2 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.items {
		flex: 1;
		overflow-y: auto;
	}

	li {
		align-items: center;
		display: flex;
		width: 100%;
	}

	li .item {
		flex: 1;
	}

	li.end {
		justify-content: flex-end;
	}
	li.sep {
		margin-top: 0.5rem;
	}

	li:hover {
		background-color: rgba(200,200,200,0.2);
	}

	.checker {
		margin-right: 0.5rem;
	}

	li.end .checker {
		margin: 0 0 0 0.5rem;
	}

	.focused {
		font-weight: bold;
	}

	.clickable {
		cursor: pointer;
	}
</style>
