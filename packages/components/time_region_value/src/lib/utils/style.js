import {getTruthyValuesKeys, joinWithBlank} from '@svizzle/utils';
import * as _ from 'lamb';

export const makeClasses = _.pipe([getTruthyValuesKeys, joinWithBlank]); // TBD to /dom?
