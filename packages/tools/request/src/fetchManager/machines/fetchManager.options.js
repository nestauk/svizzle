import * as _ from 'lamb';
import {assign} from 'xstate';

/* utils */

const pushToArrayStream = (stream, item) => {
	const array = stream.getValue();
	stream.next([...array, item]);
}

const pullFromArrayStream = (stream, item) => {
	const array = stream.getValue();
	stream.next(_.pullFrom(array, [item]));
}

/* actions */

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

/*
computeProgress
computeTargets
deleteFileFetcher
deleteUneededFetchers
pullFromLoadingURIs
spawnNewFetchers
*/

/* options */

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
