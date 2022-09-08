import compression from 'compression';
import polka from 'polka';
import sirv from 'sirv';

import * as sapper from '@sapper/server';

const {PORT, NODE_ENV} = process.env;
const dev = NODE_ENV === 'development';

polka()
.use(
	'svizzle',
	compression({threshold: 0}),
	sirv('static', {dev}),
	sapper.middleware()
)
.listen(PORT, err => {
	if (err) {
		console.log('error', err)
	}
});
