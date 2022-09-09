<script>
	import {
		ChevronDown,
		ChevronUp,
		Icon,
		Info,
		setupResizeObserver,
	} from '@svizzle/ui';

	// lib/stores
	import {_isSmallScreen} from '../stores/layout.js';

	export let subtitle = null;
	export let title = null;

	let clickCoord = {x: 0, y: 0};
	let isHeaderOpen = false;

	const savePointerPosition = event => {
		const {clientX, clientY, detail: clickCount} = event;
		clickCoord.x = clientX;
		clickCoord.y = clientY;
		if (clickCount > 1) {
			event.preventDefault();
		}
	}
	const toggleHeader = ({clientX, clientY}) => {
		const wasMouseDragged = clientX - clickCoord.x + clientY - clickCoord.y;
		if (!wasMouseDragged) {
			isHeaderOpen = !isHeaderOpen;
		}
	}

	const {
		_writable: _titleSize,
		resizeObserver: titleObserver
	} = setupResizeObserver();
	const {
		_writable: _subtitleSize,
		resizeObserver: subtitleObserver
	} = setupResizeObserver();
	const {
		_writable: _fullTitleSize,
		resizeObserver: fullTitleObserver
	} = setupResizeObserver();
	const {
		_writable: _fullSubtitleSize,
		resizeObserver: fullSubtitleObserver
	} = setupResizeObserver();

	$: showChevron =
		$_titleSize.blockSize < $_fullTitleSize.blockSize
		|| $_subtitleSize.blockSize < $_fullSubtitleSize.blockSize;
	$: isHeaderOpen = isHeaderOpen && showChevron;
</script>

<!-- background header (possibly shortened `title` & `subtitle`) -->

<header>
	<div
		class='clickable title'
		on:click={toggleHeader}
		on:mousedown={savePointerPosition}
	>
		<h1 use:titleObserver={'contentBoxSize'}>{title}</h1>
		<p use:subtitleObserver={'contentBoxSize'}>{subtitle}</p>
	</div>

	{#if showChevron}
		<div
			class='clickable chevron'
			on:click={toggleHeader}
			on:mousedown={savePointerPosition}
			role='none'
		>
			<Icon
				glyph={ChevronDown}
				size={30}
				strokeWidth={1.5}
			/>
		</div>
	{/if}

	<!-- medium+: info icon -->
	{#if !$_isSmallScreen}
		<div
			class='clickable info'
			on:click
		>
			<Icon
				glyph={Info}
				size={30}
				strokeWidth={1.5}
			/>
		</div>
	{/if}
</header>

<!-- foreground header (full-length `title` & `subtitle`) -->

<header
	class:isHeaderOpen
	class='fullTitle'
	role='none'
>
	<div
		class='clickable title'
		on:click={toggleHeader}
		on:mousedown={savePointerPosition}
	>
		<h1 use:fullTitleObserver={'contentBoxSize'}>{title}</h1>
		<p use:fullSubtitleObserver={'contentBoxSize'}>{subtitle}</p>
	</div>

	<div
		class='clickable chevron'
		on:click={toggleHeader}
		on:mousedown={savePointerPosition}
	>
		<Icon
			glyph={ChevronUp}
			size={30}
			strokeWidth={1.5}
		/>
	</div>

	<!-- medium+: info icon -->
	{#if !$_isSmallScreen}
		<div
			class='clickable info'
			on:click
		>
			<Icon
				glyph={Info}
				size={30}
				strokeWidth={1.5}
			/>
		</div>

		<p
			class='clickable foldMessage'
			on:click={toggleHeader}
			on:mousedown={savePointerPosition}
		>
			Click on title to fold
		</p>
	{:else}
		<p
			class='clickable foldMessage'
			on:click={toggleHeader}
			on:mousedown={savePointerPosition}
		>
			Tap on title to fold
		</p>
	{/if}

</header>

<style>
	header {
		background: white;
		display: grid;
		grid-template-areas:
			'title chevron info'
			'foldMessage foldMessage foldMessage';
		grid-template-columns: auto min-content min-content;
		height: auto;
		padding: var(--dimPadding);
	}
	header .title {
		grid-area: title;
		overflow: hidden;
	}
	header .title h1 {
		margin: 0;
	}
	header .title p {
		color: var(--colorRef);
		font-size: 1.2em;
		font-style: italic;
	}

	header .title * {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	header .info {
		grid-area: info;
		height: min-content;
		margin: 0 1rem;
		user-select: none;
	}
	header .chevron {
		grid-area: chevron;
		height: min-content;
		margin-left: 1rem;
		user-select: none;
	}

	.fullTitle {
		box-sizing: border-box;
		height: auto;
		left: 0;
		padding-bottom: 0;
		position: absolute;
		top: 0;
		z-index: 1;
		max-height: 0;
		overflow: hidden;
	}

	.isHeaderOpen {
		border-bottom: 1px solid var(--colorRefLight);
		box-shadow: var(--dimBoxShadowXY) var(--colorRefLight);
		max-height: none;
	}
	.fullTitle .title * {
		overflow: visible;
		text-overflow: initial;
		white-space: normal;
	}
	.fullTitle .foldMessage {
		grid-area: foldMessage;
		text-align: right;
		user-select: none;
	}

	.clickable {
		cursor: pointer;
	}
</style>
