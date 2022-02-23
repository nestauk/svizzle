export const fileFetcherConfig = {
	id: 'FileFetcher',
	initial: 'Starting',
	states: {
		Starting: {
			invoke: {
				id: 'getReader',
				src: 'getFetchReader',
				onDone: {
					actions: [
						'storeFetchReader',
						'sendParentFileStarted'
						// (ctx) => console.log(ctx)
					],
					target: '#FileFetcher.Pending'
				},
				onError: {
					target: '#FileFetcher.Erroring',
				}
			}
		},
		Pending: {
			invoke: {
				id: 'readChunk',
				src: 'readChunk',
				onDone: {
					actions: [
						'storeChunk',
						// (ctx) => console.log(ctx)
					],
					target: '#FileFetcher.Pending'
				},
				onError: {
					target: '#FileFetcher.Erroring'
				}
			},
			always: {
				cond: 'isDone',
				target: '#FileFetcher.Succesful'
			},
			on: {
				CANCEL: {
					target: '#FileFetcher.Cancelling'
				}
			}
		},
		Cancelling: {
			type: 'final',
			entry: [
				'cancelFileFetching',
				'sendParentFileCancelled'
			]
		},
		Succesful: {
			type: 'final',
			entry: [
				'sendParentFileCompleted',
			]
		},
		Erroring: {
			type: 'final',
			entry: 'sendParentFileErrored'
		}
	}
};
