// import {strict as assert} from 'assert';
import {fetch} from 'undici';
import path from 'path';
import {createMachine} from 'xstate';
import {from} from 'rxjs';

import {fileFetcherConfig} from './fileFetcher.config';
import {fileFetcherOptions} from './fileFetcher.options';
// import {createMachinaRx} from './utils';
import {
	getFileNamesMap,
	getKeysNamed,
	loadJsons,
	makeUriMap,
	startServer,
} from '../specUtils';

const fileNamesMap = getFileNamesMap(readdirSync(baseServerPath));
const uriMap = makeUriMap(`http://localhost:${PORT}/`)(fileNamesMap);
const allKeys = _.keys(uriMap);
// const keysFrom2021 = getKeysNamed('2021')(allKeys);
// const keysFrom2016 = getKeysNamed('2016')(allKeys);
// const keysFrom2013 = getKeysNamed('2013')(allKeys);

const baseServerPath = path.resolve('../atlas/data/dist/NUTS/topojson');
const TIMEOUT = 20000;
const PORT = 4000;

describe('fileFetcher', function () {
	this.timeout(TIMEOUT);

	const server = startServer({
		port: PORT,
		basePath: baseServerPath
	});
	after(function () {
		server.close()
	});

	const createFetchManager = ctx => createMachine(
		fileFetcherConfig,
		fileFetcherOptions
	).withContext(ctx);

	it('must download a file correctly', function () {
		const machine = createFetchManager({
			chunks: [],
			myFetch: fetch,
			readerCell: [],
			URI: ''
		});
		const _stream = from(machine)

		_stream.subscribe(state => console.log(state));
	});
});
