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
		},
		outputs: {
			_data
		}
	} = ctx;

	// At this point we have access to both the old value and the new value of
	// `URIs`. Ideally we need another action immediately prior to
	// `storePriorities` that will clear the cache of those values not in the
	// new `URIs` list. For now we do so here so as not to change the surface
	// of the machine.

	const data = _data.getValue();
	const nextData = {
		..._.pickIn(
			data,
			_.intersection(_.keys(data), URIs)
		)
	}
	_data.next(nextData);

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
		internals: {
			fileFetcherMachines
		},
		outputs: {
			_data,
			// _loadingURIs
		}
	} = ctx;

	const loadedURIs = _.keys(_data.getValue());
	const loadingURIs = _.keys(fileFetcherMachines);
	const {
		asapURIs,
		nextURIs
	} = _priorities.getValue();
	const URIs = _URIs.getValue();

	// 1. compute `restURIs`
	const restURIs = _.difference(
		URIs,
		_.union(asapURIs, nextURIs)
	);

	// 2. compute URIs that must be spawned
	const unfetchedAsapURIs = _.difference(
		asapURIs,
		loadedURIs
	);
	const unfetchedNextURIs = _.difference(
		nextURIs,
		loadedURIs
	);
	const unfetchedRestURIs = _.difference(
		restURIs,
		loadedURIs
	);

	const neededAsapURIs = _.difference(
		unfetchedAsapURIs,
		loadingURIs
	);
	const neededNextURIs = _.difference(
		unfetchedNextURIs,
		loadingURIs
	);
	const neededRestURIs = _.difference(
		unfetchedRestURIs,
		loadingURIs
	);

	const URIsToSpawn = isIterableNotEmpty(unfetchedAsapURIs)
		? neededAsapURIs
		: isIterableNotEmpty(unfetchedNextURIs)
			? neededNextURIs
			: neededRestURIs;

	const targetURIs = isIterableNotEmpty(unfetchedAsapURIs)
		? asapURIs
		: isIterableNotEmpty(unfetchedAsapURIs)
			? nextURIs
			: restURIs;

	// 3. compute URIs that must be cancelled
	const URIsToCancel = _.difference(
		loadingURIs,
		targetURIs
	);

	return {
		...ctx,
		internals: {
			URIsToCancel,
			URIsToSpawn
		}
	}
}

const spawnNewFetchers = ({inputs, internals}) => {
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
	// console.log('cancel called', URIsToCancel)
	const machines = _.values(_.pickIn(fileFetcherMachines, URIsToCancel));
	_.forEach(machines, machine => machine.send({type:'CANCEL'}));
}

/*
const cancelUneededFetchers = pure(({internals}) => _.map(
	internals.URIsToCancel,
	URI => send({type:'CANCEL'}, { to: URI })
));
*/

const deleteFileFetcher = ({internals},{URI}) => {
	const {fileFetcherMachines} = internals;
	const machine = fileFetcherMachines[URI];
	delete fileFetcherMachines[URI];
	machine.stop();
	return {
		internals
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
