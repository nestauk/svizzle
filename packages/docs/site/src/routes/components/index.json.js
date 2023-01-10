export function get (req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify([
		{name: 'barchart', slug: 'BarchartVDiv'},
		{name: 'choropleth', slug: 'ChoroplethG'},
		{name: 'histogram', slug: 'HistogramG'},
		{name: 'legend', slug: 'ColorBinsG'},
		{name: 'ui', slug: 'ui-AlphabetPicker'},
	]));
}
