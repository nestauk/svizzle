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
	<polyline points="18 15 12 9 6 15" />
</Icon>

<!-- feathericons/feather/icons/chevron-up.svg -->
