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
	<polyline points="20 6 9 17 4 12" />
</Icon>

<!-- feathericons/feather/icons/check.svg -->
