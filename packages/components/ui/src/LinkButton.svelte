<script>
	import IconDownload from './icons/IconDownload.svelte';

	export let text = null;
	export let url = null;
	export let withDownloadIcon = false;
</script>

<div class='linkbutton'>
	<a href={url}>
		<div>
			<span>{text}</span>
			{#if withDownloadIcon}
			<span>
				<IconDownload
					size=30
					strokeWidth=1.5
				/>
			</span>
			{/if}
		</div>
	</a>
</div>

<style>
	.linkbutton {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.linkbutton a {
		border-bottom: none;
		text-decoration: none;
	}
	.linkbutton a div {
		font-weight: bold;
		background-color: var(--color-link);
		color: white;
		padding: 1rem;
		font-size: 1.2rem;
		box-shadow: var(--box-shadow-xy);
		cursor: pointer;
	}
	.linkbutton a div {
		display: flex;
		align-items: center;
	}
	.linkbutton a div span:nth-child(2) {
		margin-left: 1rem;
	}
</style>
