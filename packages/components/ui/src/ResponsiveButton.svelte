<script>
	import {makeStyleVars} from '@svizzle/dom';

	import {setupResizeObserver} from './actions/resizeObserver.js';

	const {
		_writable: _contentSize,
		resizeObserver: contentSizeObserver
	} = setupResizeObserver();

	const {
		_writable: _sensorSize,
		resizeObserver: sensorSizeObserver
	} = setupResizeObserver();

	export let doesOverflow;
	export let isActive;
	export let isOptionalHidden;
	export let title='';
	export let theme;

	const defaultTheme = {
		borderBottom: 'none',
		borderLeft: 'none',
		borderRight: 'none',
		borderTop: 'none',
		colorBackground: 'initial',
		colorBackgroundActive: '#333',
		colorText: 'initial',
		colorTextActive: 'white',
		outlineColor: 'black',
		outlineStyle: 'auto',
		outlineWidth: '2px',
	};

	$: doesOverflow = $_contentSize.inlineSize < $_sensorSize.inlineSize;
	$: theme = {...defaultTheme, ...theme};
	$: style = makeStyleVars(theme);
</script>

<button
	{style}
	{title}
	class:active={isActive}
	class='ResponsiveButton nowrap'
	on:click
>
	<div
		class='content'
		use:contentSizeObserver
	>
		{#if !doesOverflow && !isOptionalHidden}
			<slot name='optional' />
		{/if}
		<slot name='always' />
	</div>
</button>

<div
	class='ResponsiveButtonSensor nowrap'
	role='none'
	use:sensorSizeObserver
>
	<slot name='optional' />
	<slot name='always' />
</div>

<style>
	.ResponsiveButton {
		background: var(--colorBackground);
		border-bottom: var(--borderBottom);
		border-left: var(--borderLeft);
		border-right: var(--borderRight);
		border-top: var(--borderTop);
		color: var(--colorText);
		cursor: pointer;
		font-size: 1em;
		height: 100%;
		padding: 0.5em;
		width: 100%;
	}
	.ResponsiveButton:focus-visible {
		outline: var(--outlineWidth) var(--outlineStyle) var(--outlineColor);
		outline-offset: calc(-1 * var(--outlineWidth));
		position: relative;
		z-index: 1;
	}
	.content {
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.active {
		background: var(--colorBackgroundActive);
		color: var(--colorTextActive);
	}

	.ResponsiveButtonSensor {
		position: absolute;
		visibility: hidden;
	}

	.nowrap {
		white-space: nowrap;
	}
</style>
