<script>
	export let elements;
</script>

{#each elements as {tag, content}}
	{#if tag === 'p'}
		<p>{content}</p>
	{:else if tag === 'pre'}
		<pre>{content}</pre>
	{/if}
{/each}
