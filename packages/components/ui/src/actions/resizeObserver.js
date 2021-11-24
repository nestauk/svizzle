import {writable} from 'svelte/store';

export const setupResizeObserver = () => {
	const _writable = writable({blockSize: 0, inlineSize: 0});

	function resizeObserver (node, type = 'borderBoxSize') {
		const callback = entries => _writable.set(entries[0][type][0]);
		const observer = new ResizeObserver(callback);
		observer.observe(node);
		return () => observer.disconnect();
	}

	return {_writable, resizeObserver}
}
