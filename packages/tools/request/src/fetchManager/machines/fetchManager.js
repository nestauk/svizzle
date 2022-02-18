import { createMachinaRx } from '../utils.js';

// import { fileFetcherOptions } from './groupFetcher.options';
import { fetchManagerOptions } from './fetchManager.options';
import { fetchManagerConfig } from './fetchManager.config';
import { createFetchManagerStreams } from './fetchManager.context';

export const options = {
	actions: {
		...fetchManagerOptions.actions,
	},
	guards: {
		...fetchManagerOptions.guards,
	}
};

export const createManagerMachine = () => createMachinaRx(
	fetchManagerConfig,
	options,
	createFetchManagerStreams()
);
