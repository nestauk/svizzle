import {identity} from "lamb";
import {BehaviorSubject} from "rxjs";

export const createFetchManagerContext = () => ({
	inputs: {
		_fetchFunction: new BehaviorSubject(fetch),
		_priorities: new BehaviorSubject({
			asapURIs: [],
			nextURIs: []
		}),
		_transformer: new BehaviorSubject(identity),
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
