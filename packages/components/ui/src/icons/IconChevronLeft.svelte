<script>
	import Icon from 'app/components/icons/Icon.svelte';

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
	<polyline points="15 18 9 12 15 6" />
</Icon>

<!-- feathericons/feather/icons/chevrons-left.svg -->
