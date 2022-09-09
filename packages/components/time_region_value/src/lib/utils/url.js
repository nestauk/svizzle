import {isClientSide} from '@svizzle/ui';

export const makeURL = (base, id, year) => {
	let url = year
		? `${base}/${id}/${year}`
		: `${base}/${id}`;

	if (isClientSide) {
		const {protocol, host} = location;

		url = new URL(url, `${protocol}//${host}`).toString();
	}

	return url;
}
