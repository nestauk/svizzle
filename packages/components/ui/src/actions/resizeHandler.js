import * as _ from 'lamb';

export const resizeHandler = (
	node,
	{
		onResize,
		onResizeEnd,
		onResizeStart,
		timeout = 500
	} = {}
) => {
	let resizing = false;

	const started = size => {
		resizing = true;
		onResizeStart?.(size);
	}
	const scheduleEnded = _.debounce(size => {
		resizing = false;
		onResizeEnd?.(size);
	}, timeout);

	const observer = new ResizeObserver(entries => {
		const [size] = entries[0].borderBoxSize;
		!resizing && started(size);

		onResize?.(size);

		scheduleEnded(size);
	});
	observer.observe(node);

	return () => {
		observer.disconnect();
	}
}
