export const fileFetcherConfig = {
	id: 'FileFetcher',
	initial: 'Pending',
	states: {
		Pending: {
			entry: 'startFileFetching',
			on: {
				CANCEL: {
					target: '#FileFetcher.Canceling'
				},
				SUCCESS: {
					target: '#FileFetcher.Succesful'
				},
				ERRORED: {
					target: '#FileFetcher.Erroring'
				}
			}
		},
		Canceling: {
			type: 'final',
			entry: [
				'cancelFileFetching',
				'sendParentCanceled'
			]
		},
		Succesful: {
			entry: 'sendParentFileCompleted'
		},
		Erroring: {
			entry: 'sendParentFileErrored'
		}
	}
};
