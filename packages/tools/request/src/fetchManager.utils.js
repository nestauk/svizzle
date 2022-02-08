import {createReadStream} from 'fs'
import http from 'http'

import {readJson} from '@svizzle/file'
import * as _ from 'lamb'
import serveHandler from 'serve-handler'
import Throttle from 'throttle'
import { makePrefixed } from '@svizzle/utils'
import { tapValue } from '@svizzle/dev'

const decoder = new TextDecoder()
const decode = bytes => decoder.decode(bytes)
export const jsonParser = _.pipe([
	decode,
	JSON.parse
])

export const loadJsons = async (basePath, fileNames, baseUrl) => {
	const fileLoadingPromises = _.pipe([
		_.mapWith(fileName =>
			[`${baseUrl}${fileName}`, `${basePath}/${fileName}`]
		),
		tapValue('pairs'),
		_.mapWith(async ([key, filePath]) =>
			[key, await readJson(filePath)])
	])(fileNames)

	const loadedFiles = await Promise.all(fileLoadingPromises)
	return _.fromPairs(loadedFiles)
}

export const getFilteredFileNames = _.pipe([
	_.filterWith(fileName => fileName.endsWith('.json')),
	_.filterWith(fileName => (/.*\d\.json$/u).test(fileName)),
])

export const getFileNamesMap = _.pipe([
	getFilteredFileNames,
	_.mapWith(fileName => [
		`NUTS-${fileName.substr(12,4)}-${fileName.substr(27,1)}-${fileName.substr(8,2)}`,
		fileName
	]),
	_.fromPairs
// eslint-disable-next-line no-sync
])

export const makeUris = baseUri => _.mapWith(makePrefixed(baseUri))

export const makeUriMap = baseUri => _.pipe([
	_.pairs,
	_.mapWith(([key, fileName]) => [
		key,
		{url: baseUri + fileName}
	]),
	_.fromPairs
])

export const getKeysNamed = string =>
	_.filterWith(key => key.includes(string))

export const startServer = ({bandwidth, port, basePath}) => {
	let middleware
	if (bandwidth) {
		middleware = {
			createReadStream (filePath, config) {
				const throttledStream = new Throttle({bps: bandwidth})
				createReadStream(filePath, config).pipe(throttledStream)
				return throttledStream
			}
		}
	}
	const server = http.createServer(async (req, res) => {
		await serveHandler(
			req,
			res,
			{public: basePath},
			middleware
		)
	})
	server.listen(port)
	return server
}

