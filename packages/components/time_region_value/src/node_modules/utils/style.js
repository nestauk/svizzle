import {joinWithBlank} from '@svizzle/utils';
import * as _ from 'lamb';

export const makeClasses = _.pipe([
	_.pickIf(_.identity),
	_.keys,
	joinWithBlank
]);
