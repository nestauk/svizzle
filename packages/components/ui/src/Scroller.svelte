<script>
	import {makeStyleVars} from '@svizzle/dom';
	import {color} from 'd3-color';

	import {setupResizeObserver} from './actions/resizeObserver.js';

	const defaultTheme = {
		bottomShadowGeometry: 'inset 0px -12px 13px -13px',
		shadowColor: 'lightgrey',
		topShadowGeometry: 'inset 0px 12px 13px -13px',
	};

	export let theme;

	let hasBottomShadow;
	let hasTopShadow;
	let scroller;
	let shadowOpacityBottom = 1;
	let shadowOpacityTop = 1;

	const {
		_writable: _size,
		resizeObserver
	} = setupResizeObserver();

	const onScroll = () => {
		const {
			offsetHeight,
			scrollTop,
			scrollHeight
		} = scroller;
		const scrollEnd = scrollTop + offsetHeight;
		const scrollBottom = scrollHeight - scrollEnd;

		hasTopShadow = scrollTop > 0;
		hasBottomShadow = scrollHeight > scrollEnd;
		shadowOpacityTop = scrollTop < 10 ? scrollTop / 10 : 1;
		shadowOpacityBottom = scrollBottom < 10
			? scrollBottom / 10
			: 1;
	};

	$: scroller && $_size && onScroll();
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
	on:scroll={onScroll}
	use:resizeObserver
>
	<slot/>
</div>

<style>
	.Scroller {
		height: 100%;
		overflow: auto;
		position: relative;
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
