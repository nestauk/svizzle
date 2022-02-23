import {identity} from 'lamb';
import {BehaviorSubject} from 'rxjs';

export const createFetchManagerContext = ({fetchFunction, transformer = identity}) => ({
	inputs: {
		fetchFunction,
		transformer,
		_priorities: new BehaviorSubject({
			asapURIs: [],
			nextURIs: []
		}),
		_URIs: new BehaviorSubject([])
	},
	outputs: {
		_data: new BehaviorSubject({}),
		_loadingURIs: new BehaviorSubject([])
	},
	internals: {
		URIsToCancel: [],
		URIsToSpawn: [],
		fileFetcherMachines: {}
	}
});
