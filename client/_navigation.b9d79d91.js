const makeURL = (base, id, year) =>
	new URL(
		year ? `${base}/${id}/${year}` : `${base}/${id}`,
		document.baseURI
	);

const hrefBase = 'compounds/time_region_value';

export { hrefBase as h, makeURL as m };
