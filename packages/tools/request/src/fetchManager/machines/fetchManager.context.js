import { BehaviorSubject } from "rxjs";

export const createFetchManagerContext = () => ({
	inputs: {
		_priorities: new BehaviorSubject({
			asapURIs: [],
			nextURIs: []
		}),
		_URIs: new BehaviorSubject([]),
		_fetchUpTo: new BehaviorSubject('asap'),
	},
	outputs: {
		_data: new BehaviorSubject({}),
		_loadingURIs: new BehaviorSubject([]),
	},
	internals: {
		URIsToCancel: [],
		URIsToSpawn: [],
		fileFetcherMachines: {}
	}
});
