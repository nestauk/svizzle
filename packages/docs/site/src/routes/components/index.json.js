export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify([
		{name: 'BarchartVDiv', slug: 'BarchartVDiv'},
		{name: 'ChoroplethG', slug: 'ChoroplethG'},
		{name: 'HistogramG', slug: 'HistogramG'},
	]));
}
