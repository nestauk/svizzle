import { isIterableNotEmpty } from '@svizzle/utils';
import * as _ from 'lamb';
import { send } from 'process';
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


const spawnNewFetchers = ({internals}) => {
	const {URIsToSpawn, fileFetcherMachines} = internals;
	const newMachines = _.pipe([
		_.mapWith(URI => [
			URI,
			spawn(fileFetcherTemplate.withContext({
				URI,
				readerCell: [],
				chunks: []
			}))
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

/*
function createForm (ctx, id, arrayIndex) {
	const machine = formTemplate.withContext({
		...ctx,
		id,
		arrayIndex,
		...createFormStores(),
	});
	const interpreter = spawn(machine, id);
	const newForm = {
		id,
		text: capitalize(id),
		value: arrayIndex,
		disabled: false,
		machine: bindToStore(interpreter),
	};
	return newForm;
}

function spawnFileFetcher (ctx) {
	const forms = get(ctx.forms);
	const arrayIndex = forms.length;
	const selectedForm = get(ctx.selectedForm);
	if (!selectedForm || selectedForm.value + 1 === arrayIndex) {
		const nextName = AXIS_NAMES[arrayIndex];
		const newForm = createForm(ctx, nextName, arrayIndex);
		ctx.forms.set([
			...forms,
			newForm
		]);
		!selectedForm && ctx.selectedForm.set(newForm);
	}
}
*/

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
		computeProgress: assign(computeProgress),
		spawnNewFetchers: assign(spawnNewFetchers),
		cancelUneededFetchers,
		deleteFileFetcher: assign(deleteFileFetcher)
	},
	guards: {
	}
};
