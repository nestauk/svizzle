<script>
	import {HyperLink} from '@svizzle/ui';
	import {isArray, isObject} from '@svizzle/utils';
	import {pairs} from 'lamb';

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
										<HyperLink {href}>Link {index + 1}</HyperLink>
									</span>
								</li>
							{/each}
						</ul>
					</li>
				{:else}
					<li>
						<span>
							<HyperLink href={value}>{key}</HyperLink>
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
						<HyperLink {href}>HyperLink {index + 1}</HyperLink>
				</li>
			{/each}
		</ul>
	{:else}
		<p>
			<b>{title}:</b>
			<HyperLink href={item}>{text}</HyperLink>
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
