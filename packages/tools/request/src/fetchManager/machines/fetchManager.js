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

// FIXME should parameter properties be explicit in this signature?
export const createFetchManager = additionalContext =>
	createMachinaRx(
		fetchManagerConfig,
		options,
		createFetchManagerContext(additionalContext)
	);
