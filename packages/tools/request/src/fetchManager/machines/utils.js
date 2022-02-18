/* eslint-disable no-process-env */

import {interpret, Machine} from 'xstate';

/**
 * Creates an xstate machine service and returns it together with contextStreams
 * passed to it
 *
 * @param machineConfig - A valid xstate configuration object
 * @param machineOptions - A valid xstate options object: {actions, activities, guards, services}
 * @param contextStreams - The default streams to be passed to xstate as context
 * @returns An object containing two objects. One being a store containing the xstate machine, the other containing the stores passed in as context.
 */
export function createMachinaRx (machineConfig, machineOptions, contextStreams) {
	const machine = Machine({
		...machineConfig,
		context: contextStreams
	}, machineOptions);

	const service = interpret(machine, { devTools: process.env.INSPECT === 'true' });

	service.start();

	return {
		service,
		contextStreams
	};
}
