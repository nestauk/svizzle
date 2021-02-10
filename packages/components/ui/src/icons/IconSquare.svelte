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
	<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
</Icon>

<!-- feather/icons/square.svg -->
