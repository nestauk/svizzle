<script>
	import {pairs} from 'lamb';
	import {isArray, isObject} from '@svizzle/utils';
	import Link from '@svizzle/ui/src/Link.svelte';

	export let item = null;
	export let text = null;
	export let title = null;
</script>

<div>
	{#if isObject(item)}
		<p>
			<b>{title}:</b>
		</p>
		<ul>
			{#each pairs(item) as [key, value]}
				{#if isArray(value)}
					<li>
						{key}:
						<ul>
							{#each value as href, index}
								<li>
									<span>
										<Link {href}>Link {index + 1}</Link>
									</span>
								</li>
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<span>
							<Link href={value}>{key}</Link>
						</span>
					</li>
				{/if}
			{/each}

		</ul>
	{:else if isArray(item)}
		<p>
			<b>{title}:</b>
		</p>
		<ul>
			{#each item as href, index}
				<li>
					<span>
						<Link {href}>Link {index + 1}</Link>
				</li>
			{/each}
		</ul>
	{:else}
		<p>
			<b>{title}:</b>
			<Link href={item}>{text}</Link>
		</p>
	{/if}
</div>

<style>
	b {
		margin-right: 0.25rem;
	}

	ul {
		margin-left: 1.5rem;
	}
</style>
