import * as _ from 'lamb';
import {objectToKeyValueArray} from '@svizzle/utils';

import * as examples from './_examples';

const makeGroupsString = _.pipe([
	objectToKeyValueArray,
	JSON.stringify
]);

const groups = makeGroupsString(examples);

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(groups);
}
