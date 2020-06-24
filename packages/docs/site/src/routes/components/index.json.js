export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify([
		{name: 'BarchartV', slug: 'BarchartV'},
		{name: 'ChoroplethSVG', slug: 'ChoroplethSVG'},
		{name: 'ChoroplethDiv', slug: 'ChoroplethDiv'},
		{name: 'HistogramG', slug: 'HistogramG'},
	]));
}
