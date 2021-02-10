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
	<line x1="18" y1="6" x2="6" y2="18" />
	<line x1="6" y1="6" x2="18" y2="18" />
</Icon>

<!-- feathericons/feather/icons/x.svg -->
