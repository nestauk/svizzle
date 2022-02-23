import { isIterableNotEmpty } from '@svizzle/utils';
import * as _ from 'lamb';
import {assign, spawn} from 'xstate';

import {fileFetcherTemplate} from './fileFetcher';

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

const storePriorities = (ctx, {
	URIs,
	priorities
}) => {
	const {
		inputs: {
			_priorities,
			_URIs
		}
	} = ctx;
	_priorities.next(priorities);
	_URIs.next(URIs);
	return ctx;
}

const addToLoadingURIs = (ctx, {URI}) => {
	const {_loadingURIs} = ctx.outputs;
	pushToArrayStream(_loadingURIs, URI);
	return ctx;
}

const removeFromLoadingURIs = (ctx, {URI}) => {
	const {_loadingURIs} = ctx.outputs;
	pullFromArrayStream(_loadingURIs, URI);
	return ctx;
}

const addFileToData = (ctx, {URI, bytes}) => {
	const {
		inputs: {transformer},
		outputs: {_data}
	} = ctx;

	const obj = _data.getValue();
	const nextData = {
		...obj,
		[URI]: transformer(bytes)
	}
	_data.next(nextData);
	return ctx;
}

const computeProgress = ctx => {
	const {
		inputs: {
			_priorities,
			_URIs
		},
		outputs: {
			_data,
			_loadingURIs
		}
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

const spawnNewFetchers = ({inputs,internals}) => {
	const {fetchFunction} = inputs;
	const {URIsToSpawn, fileFetcherMachines} = internals;
	const newMachines = _.pipe([
		_.mapWith(URI => [
			URI,
			spawn(fileFetcherTemplate.withContext(
				{
					URI,
					chunks: [],
					done: false,
					myFetch: fetchFunction
				},
				URI // id
			))
		]),
		_.fromPairs
	])(URIsToSpawn);

	return {
		internals: {
			...internals,
			fileFetcherMachines: {
				...fileFetcherMachines,
				...newMachines
			}
		}
	}
}

const cancelUneededFetchers = ({internals}) => {
	const {fileFetcherMachines, URIsToCancel} = internals;
	const machines = _.values(_.pickIn(fileFetcherMachines, URIsToCancel));
	_.forEach(machines, machine => machine.send('CANCEL'));
}

const deleteFileFetcher = ({internals},{URI}) => {
	const {fileFetcherMachines} = internals;
	const machine = fileFetcherMachines[URI];
	machine.stop();
	delete fileFetcherMachines[URI];
	return {
		internals: {
			...internals,
			fileFetcherMachines: {...fileFetcherMachines}
		}
	}
}

/* options */

export const fetchManagerOptions = {
	actions: {
		addToLoadingURIs: assign(addToLoadingURIs),
		addFileToData: assign(addFileToData),
		removeFromLoadingURIs: assign(removeFromLoadingURIs),
		computeProgress: assign(computeProgress),
		spawnNewFetchers: assign(spawnNewFetchers),
		cancelUneededFetchers,
		deleteFileFetcher: assign(deleteFileFetcher),
		storePriorities: assign(storePriorities)
	},
	guards: {
	}
}
