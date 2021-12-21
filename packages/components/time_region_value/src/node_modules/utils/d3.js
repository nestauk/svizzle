import {isNotNil} from '@svizzle/utils';

// extent([]) -> [undefined, undefined]
export const isValidExtent = ([a, b]) => isNotNil(a) && isNotNil(b) && a !== b;
