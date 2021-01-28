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
	<circle cx="12" cy="12" r="10" />
	<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
	<line x1="12" y1="17" x2="12.01" y2="17" />
</Icon>

<!-- feathericons/feather/icons/helpcircle.svg -->
