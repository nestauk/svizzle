export default {
	world: {
		// epsgId: undefined, // TODO
		// years: undefined, // TODO
		levels: [0],
		objectIds: ['countries', 'land'],
		properties: ['iso_a2'],
		resolutions: ['110m'],
		type: 'world',
	},
	NUTS: {
		epsgId: 4326,
		levels: [0, 1, 2, 3],
		objectIds: ['NUTS'],
		properties: [
			'NUTS_ID',
			'LEVL_CODE',
			'CNTR_CODE',
			'NUTS_NAME',
			'FID',
		],
		resolutions: ['03M', '10M'],
		type: 'NUTS',
		years: [
			2003,
			2006,
			2010,
			2013,
			2016,
			2021,
		],
	},
}
