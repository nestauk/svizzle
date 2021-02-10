<script>
	import Icon from './Icon.svelte';

	export let size = null;
	export let fill = null;
	export let stroke = null;
	export let strokeWidth = null;
</script>

<Icon
	{fill}
	{stroke}
	{strokeWidth}
	height={size}
	width={size}
>
	<line class="top-bun" x1="3" y1="12" x2="21" y2="12" />
	<line class="meat" x1="3" y1="6" x2="21" y2="6" />
	<line class="bottom-bun" x1="3" y1="18" x2="21" y2="18" />
</Icon>

<!-- feathericons/feather/icons/menu.svg -->
