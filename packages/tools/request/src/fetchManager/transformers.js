import * as _ from 'lamb';

/* buffer -> JSON */

const decoder = new TextDecoder();
const decode = bytes => decoder.decode(bytes);

export const jsonBufferToAny = _.pipe([
	decode,
	JSON.parse,
]);
