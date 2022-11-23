<script>
	$: headerPaddingTop = $$slots.header ? '1em' : 0;
	$: style = `--headerPaddingTop: ${headerPaddingTop};`;
</script>

<div class='LayoutHMF' {style}>
	<header>
		<slot name='header' />
	</header>
	<main>
		<slot name='main' />
	</main>
	<footer>
		<slot name='footer' />
	</footer>
</div>

<style>
	.LayoutHMF {
		display: grid;
		grid-template-areas: 'header' 'main' 'footer';
		grid-template-rows: min-content 1fr min-content;
		height: 100%;
		overflow: auto;
		width: 100%;
	}

	header {
		grid-area: header;
		padding-left: 1em;
		padding-top: var(--headerPaddingTop);
	}
	main {
		grid-area: main;
		overflow: auto;
	}
	footer {
		font-style: italic;
		grid-area: footer;
		padding: 0.5em 1em;
		text-align: right;
	}
</style>
