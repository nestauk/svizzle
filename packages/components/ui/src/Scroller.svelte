<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {color} from 'd3-color';

	import {setupResizeObserver} from './actions/resizeObserver.js';

	const defaultTheme = {
		bottomShadowGeometry: 'inset 0px -12px 13px -13px',
		shadowColor: 'lightgrey',
		topShadowGeometry: 'inset 0px 12px 13px -13px',
	};

	export let outerScrollTop = 0;
	export let scrollbarWidth = 0;
	export let theme;

	let hasBottomShadow;
	let hasTopShadow;
	let previousScrollTop = 0;
	let scroller;
	let shadowOpacityBottom = 1;
	let shadowOpacityTop = 1;

	const {
		_writable: _scrollerSize,
		resizeObserver: observeScrollerSize
	} = setupResizeObserver();

	const {
		_writable: _slotSize,
		resizeObserver: observeSlotSize
	} = setupResizeObserver();

	const update = () => {
		const {
			offsetHeight,
			offsetWidth,
			scrollTop,
			scrollHeight,
			scrollWidth
		} = scroller;
		const scrollEnd = scrollTop + offsetHeight;
		const scrollBottom = scrollHeight - scrollEnd;

		hasTopShadow = scrollTop > 0;
		hasBottomShadow = scrollHeight > scrollEnd;
		shadowOpacityTop = scrollTop < 10 ? scrollTop / 10 : 1;
		shadowOpacityBottom = scrollBottom < 10
			? scrollBottom / 10
			: 1;
		scrollbarWidth = offsetWidth - scrollWidth;
		previousScrollTop = scrollTop;
		if (outerScrollTop !== scrollTop) {
			outerScrollTop = scrollTop;
		}
	};

	$: ({blockSize: slotHeight} = $_slotSize);
	$: scroller && $_scrollerSize && slotHeight && update();
	$: if (previousScrollTop !== outerScrollTop) {
		scroller.scroll({
			top: outerScrollTop,
			behavior: 'smooth'
		})
		// scroller.scrollTop = outerScrollTop;
	}
	$: theme = theme ? {...defaultTheme, ...theme} : defaultTheme;
	$: rgb = color(theme.shadowColor).rgb();
	$: bottomShadow = `${theme.bottomShadowGeometry} rgba(${rgb.r},${rgb.g},${rgb.b},${shadowOpacityBottom})`;
	$: topShadow = `${theme.topShadowGeometry} rgba(${rgb.r},${rgb.g},${rgb.b},${shadowOpacityTop})`;
	$: style = makeStyleVars({bottomShadow, topShadow});
</script>

<div
	{style}
	bind:this={scroller}
	class:shadowBottom={hasBottomShadow}
	class:shadowTop={hasTopShadow}
	class='Scroller'
	on:scroll={update}
	use:observeScrollerSize
>
	<div use:observeSlotSize>
		<slot />
	</div>
</div>

<style>
	.Scroller {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
		width: 100%;
	}

	.shadowTop {
		box-shadow: var(--topShadow);
	}
	.shadowBottom {
		box-shadow: var(--bottomShadow);
	}
	.shadowTop.shadowBottom {
		box-shadow:
			var(--topShadow),
			var(--bottomShadow);
	}
</style>
