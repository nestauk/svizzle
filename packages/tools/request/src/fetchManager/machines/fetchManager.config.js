export const fetchManagerConfig = {
	id: 'manager',
	initial: 'Active',
	states: {
		Active: {
			on: {
				FILE_CANCELLED: {
					target: '#manager.UpdatingForFileEvent'
				},
				FILE_STARTED: {
					actions: 'addToLoadingURIs',
					target: '#manager.Active'
				},
				FILE_COMPLETED: {
					actions: 'addFileToData',
					target: '#manager.UpdatingForFileEvent'
				},
				FILE_ERRORED: {
					target: '#manager.UpdatingForFileEvent'
				},
				PRIORITY_CHANGED: {
					actions: 'storePriorities',
					target: '#manager.UpdatingForPropsChange'
				},
				TRANSFORMER_CHANGED: {
					actions: 'storeTransformer',
				},
				FETCH_CHANGED: {
					actions: 'storeFetchFunction',
				},
				URIs_CHANGED: {
					target: '#manager.UpdatingForPropsChange'
				}
			}
		},
		UpdatingForFileEvent: {
			entry: 'removeFromLoadingURIs',
			always: {
				target: '#manager.UpdatingForPropsChange'
			}
		},
		UpdatingForPropsChange: {
			entry: [
				'computeProgress',
				'cancelUneededFetchers',
				'spawnNewFetchers'
			],
			always: {
				target: '#manager.Active'
			}
		}
	}
}
