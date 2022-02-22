import { BehaviorSubject } from "rxjs";

export const createFileFetcherContext = () => ({
	chunks: [],
	done: false,
	fetchReader: null,
	myFetch: null,
	URI: null
});
