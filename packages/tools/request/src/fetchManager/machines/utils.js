import {interpret, Machine} from 'xstate';
import * as _ from 'lamb';
import {stringify} from '@svizzle/utils';
import { BehaviorSubject } from 'rxjs';

export function bindToStream (interpreter) {
	const machineStore = new BehaviorSubject(interpreter.initialState);

	interpreter.onTransition(nextState => {
		machineStore.next(nextState);
	});

	return {
		subscribe: machineStore.subscribe,
		send: interpreter.send,
	};
}

/**
 * Creates an xstate machine and places it into a svelte store.
 * Also creates a svelte store to be passed to the machine as context
 *
 * @param machineConfig - A valid xstate configuration object
 * @param machineOptions - A valid xstate options object: guards, actions, services, activities
 * @param contextStreams - The default store(s) to be passed to xstate as context
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


export const stringifyContextStores = _.pipe([_.mapValuesWith(get), stringify]);
