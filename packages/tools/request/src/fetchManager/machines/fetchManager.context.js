import { BehaviorSubject } from "rxjs";

export const createFetchManagerStreams = () => ({
	_priorities: new BehaviorSubject({
		asapURIs: [],
		nextURIs: []
	}),
	_URIs: new BehaviorSubject([]),
	_fetchUpTo: new BehaviorSubject('asap'),
	_data: new BehaviorSubject({}),
	_loadingURIs: new BehaviorSubject([])
});
