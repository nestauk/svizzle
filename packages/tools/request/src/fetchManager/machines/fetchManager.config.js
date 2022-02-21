export const fetchManagerConfig = {
	id: 'manager',
	initial: 'Active',
	states: {
		Active: {
			on: {
				PRIORITIES_CHANGED: {
					actions: [
						'updatePriorities'
					],
					target: '#manager.UpdatingForPropsChange'
				},
				FILE_STARTED: {
					actions: 'addToLoadingURIs',
					target: '#manager.Active'
				},
				FILE_COMPLETED: {
					actions: 'addFileToData',
					target: '#manager.UpdatingForFetchEvent'
				},
				FILE_ERRORED: {
					target: '#manager.UpdatingForFetchEvent'
				},
				URIs_CHANGED: {
					actions: [
						'updateURIs'
					],
					target: '#manager.UpdatingForPropsChange'
				}
			}
		},
		UpdatingForFetchEvent: {
			entry: [
				'pullFromLoadingURIs',
				'deleteFileFetcher',
			],
			always: {
				target: '#manager.Active'
			}
		},
		UpdatingForPropsChange: {
			entry: [
				'computeTargets',
				'computeProgress',
				'deleteUneededFetchers',
				'spawnNewFetchers'
			],
			always: {
				target: '#manager.Active'
			}
		}
	}
};
