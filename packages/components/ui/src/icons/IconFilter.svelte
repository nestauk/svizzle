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
	<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
</Icon>

<!-- feathericons/feather/icons/filter.svg -->
