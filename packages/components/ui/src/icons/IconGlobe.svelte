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
	<line x1="2" y1="12" x2="22" y2="12" />
	<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
</Icon>

<!-- feathericons/feather/icons/globe.svg -->
