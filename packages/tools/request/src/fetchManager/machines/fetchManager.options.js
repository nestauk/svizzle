import { isIterableNotEmpty } from '@svizzle/utils';
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

const computeProgress = ctx => {
	const {
		inputs: {
			_loadingURIs,
			_priorities,
			_URIs
		},
		outputs: {_data}
	} = ctx;

	const loadedUris = _.keys(_data.getValue());
	const loadingUris = _loadingURIs.getValue();
	const {
		asapURIs,
		nextURIs
	}= _priorities.getValue();
	const URIs = _URIs.getValue();

	// 1. compute `restURIs`
	const restURIs = _.difference(
		URIs,
		_.union(asapURIs, nextURIs)
	);
	// 2. compute URIs that must be spawned
	const neededAsapURIs = _.difference(
		asapURIs,
		_.union(loadedUris, loadingUris)
	);
	const neededNextURIs = _.difference(
		nextURIs,
		_.union(loadedUris, loadingUris)
	);
	const neededRestURIs = _.difference(
		restURIs,
		_.union(loadedUris, loadingUris)
	);

	const URIsToSpawn = isIterableNotEmpty(neededAsapURIs)
		? neededAsapURIs
		: isIterableNotEmpty(neededNextURIs)
			? neededNextURIs
			: neededRestURIs;

	// 3. compute URIs that must be cancelled
	const URIsToCancel = _.difference(
		loadingUris,
		URIsToSpawn
	);

	return {
		...ctx,
		internals: {
			URIsToCancel,
			URIsToSpawn
		}
	}
}

const spawnNewFetchers = ({internals:{URIsToSpawn, fileFetcherMachines}}) => {
	
}

/*
cancelUneededFetchers
deleteFileFetcher
spawnNewFetchers
*/

/* options */

export const fetchManagerOptions = {
	actions: {
		addToLoadingURIs: assign(addToLoadingURIs),
		addFileToData: assign(addFileToData),
		removeFromLoadingURIs: assign(removeFromLoadingURIs),
		computeProgress: assign(computeProgress)
	},
	guards: {
	}
};
