import { BehaviorSubject } from "rxjs";

export const createFileFetcherContext = () => ({
	URI: null,
	readerCell: [],
	chunks: [],
	myFetch: null
});
