/**
* @module @svizzle/dom/nodes
*/

import {pickIn} from 'lamb';
import {mapValuesToFloatPossibly} from '@svizzle/utils';

/* get */

/**
 * Return an object derived from getComputedStyle(domNode) with values converted to numbers.
 * It extracts values for `width`, `height` and all keys in `additionalProps`.
 * Note that `additionalProps` are CSS selectors with the hyphen removed (if any) and camel cased:
 * for example `font-size` -> `fontSize`.
 *
 * @function
 * @arg {object} node - DOM element
 * @arg {array} additionalProps
 * @return {object}
 *
 * @example
> getElementGeometry(node)
{width: 200, height: 100}

> getElementGeometry(node, ['fontSize'])
{width: 200, height: 100, 'fontSize': 12}
 *
 * @since 0.1.0
 */
export const getElementGeometry = (elem, additionalProps = []) =>
	mapValuesToFloatPossibly(
		pickIn(getComputedStyle(elem), [
			'width',
			'height',
			...additionalProps
		])
	);
