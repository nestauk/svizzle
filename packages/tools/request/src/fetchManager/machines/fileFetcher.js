import {createMachine} from 'xstate';

import {fileFetcherConfig} from './fileFetcher.config';
import {fileFetcherOptions} from './fileFetcher.options';

export const fileFetcherTemplate = createMachine(
	fileFetcherConfig,
	fileFetcherOptions
);
