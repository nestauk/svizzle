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
	<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
	<line x1="18" y1="9" x2="12" y2="15" />
	<line x1="12" y1="9" x2="18" y2="15" />
</Icon>

<!-- feathericons/feather/icons/delete.svg -->
