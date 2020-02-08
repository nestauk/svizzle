import * as _ from "lamb";
import {indexValuesWith} from '@svizzle/utils';

import * as examples from './_examples';

const makeLookup = _.pipe([
	indexValuesWith(_.getKey('slug')),
	_.mapValuesWith(JSON.stringify)
]);

const lookup = makeLookup(examples);

// eslint-disable-next-line no-unused-vars
export function get(req, res, next) {
	const { slug } = req.params; // BarchartV-items_default_shape
	const content = lookup[slug];

	if (content) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(content);
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
