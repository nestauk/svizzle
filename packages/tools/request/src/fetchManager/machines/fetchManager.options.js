/*
addFileToData
addToLoadingURIs
computeProgress
computeTargets
deleteFileFetcher
deleteUneededFetchers
pullFromLoadingURIs
spawnNewFetchers
*/

import { assign } from "core-js/core/object";
import _ as * from 'lamb';

const pushToArrayStream = (stream, item) => {
	const array = stream.getValue();
	stream.next([...array, item]);
}

const pullFromArrayStream = (stream, item) => {
	const array = stream.getValue();
	stream.next(_.pullFrom(array, [item]));
}

const addToLoadingURIs = ({_loadingURIs}, {URI}) => {
	pushToArrayStream(_loadingURIs, URI);
	return {_loadingURIs};
}

const removeFromLoadingURIs = ({_loadingURIs}, {URI}) => {
	pullFromArrayStream(_loadingURIs, URI);
	return {_loadingURIs};
}

const addFileToData = ({_data}, {URI, data}) => {
	const obj = _data.getValue();
	_data.next({
		...obj,
		[URI]: data
	});
	return {_data};
}

const computeTargets = (ctx, {}) => {

}

export const fetchManagerOptions = {
	actions: {
		addToLoadingURIs: assign(addToLoadingURIs),
		addFileToData: assign(addFileToData),
		removeFromLoadingURIs: assign(removeFromLoadingURIs),
		computeTargets: assign(computeTargets)
	},
	guards: {
	}
};
