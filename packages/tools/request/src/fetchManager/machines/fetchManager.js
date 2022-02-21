import { createMachinaRx } from './utils';

import { fetchManagerOptions } from './fetchManager.options';
import { fetchManagerConfig } from './fetchManager.config';
import { createFetchManagerContext } from './fetchManager.context';

export const options = {
	actions: {
		...fetchManagerOptions.actions,
	},
	guards: {
		...fetchManagerOptions.guards,
	}
};

export const createFetchManager = () => createMachinaRx(
	fetchManagerConfig,
	options,
	createFetchManagerContext()
);
