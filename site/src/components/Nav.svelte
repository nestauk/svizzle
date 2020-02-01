<script>
	export let segment;
</script>

<nav>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'>Home</a></li>
		<li>
			<a
				rel=prefetch
				class:selected='{segment === "tools"}'
				href='tools'
			>Tools</a>
		</li>
		<li>
			<a
				rel=prefetch
				class:selected='{segment === "components"}'
				href='components'
			>Components</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		height: 100%;
		font-weight: 300;

		display: flex;
		align-items: center;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
