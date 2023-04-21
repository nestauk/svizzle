<script>
	import {A11yPerson, Icon} from '@svizzle/ui';

	export let isA11yDirty = false;
	export let segment;
	export let showA11yMenu = false;

	const toggleA11yMenu = event => {
		showA11yMenu = !showA11yMenu;
		event.target.setAttribute('aria-expanded', showA11yMenu.toString());
	}
</script>

<nav>
	<div>
		<ul>
			<li>
				<a
					class:selected={segment === undefined}
					href='./'
				>Tools</a>
			</li>
			<li>
				<a
					rel=prefetch
					class:selected={segment === 'components'}
					href='./components/BarchartVDiv'
				>Components</a>
			</li>
			<li>
				<a
					rel=prefetch
					class:selected={segment === 'compounds'}
					href='./compounds'
				>Compounds</a>
			</li>
		</ul>
	</div>
	<div>
		<ul>
			<li>
				<a href='https://github.com/nestauk/svizzle'>Github repo</a>
			</li>
			<li>
				<button
					aria-label='Accessibility settings'
					class='clickable'
					on:click={toggleA11yMenu}
				>
					<Icon
						glyph={A11yPerson}
						stroke={isA11yDirty ? 'white' : 'black'}
						strokeWidth=1
						fill={isA11yDirty ? 'black' : 'white'}
					/>
				</button>
			</li>
		</ul>
	</div>
</nav>

<style>
	nav {
		width: 100%;
		height: 100%;
		font-weight: 300;

		display: flex;
		justify-content: space-between;
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
		padding: 1em 0.5em;
	}

	.selected {
		font-weight: bold;
	}
	/*
	.selected {
		position: relative;
		display: inline-block;
	}
	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: red;
		display: block;
		bottom: 1px;
	}
	*/

	a {
		text-decoration: none;
		display: block;
	}
	button {
		border: none;
		background: transparent;
		height: min-content;
		width: min-content;
	}
	.clickable {
		cursor: pointer;
	}
</style>
