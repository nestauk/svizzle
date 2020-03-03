export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	// FIXME
	res.end(JSON.stringify([
		{name: 'BarchartV', slug: 'BarchartV'},
		{name: 'ChoroplethSVG', slug: 'ChoroplethSVG'},
		{name: 'ChoroplethDiv', slug: 'ChoroplethDiv'},
		{name: 'ChoroplethWorldDiv', slug: 'ChoroplethWorldDiv'},
	]));
}
