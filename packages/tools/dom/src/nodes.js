/**
* @module @svizzle/dom/nodes
*/

import {select} from "d3-selection";
import {pick} from "lamb";
import {mapValuesToFloatPossibly} from "@svizzle/utils";

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
getElementGeometry(node)
// {width: 200, height: 100}

getElementGeometry(node, ["fontSize"])
// {width: 200, height: 100, "fontSize": 12}
 *
 * @version 0.1.0
 */
export const getElementGeometry = (elem, additionalProps = []) =>
    mapValuesToFloatPossibly(
        pick(getComputedStyle(elem), [
            "width",
            "height",
            ...additionalProps
        ])
    );

/* edit */

/**
 * Moves a node in the DOM.
 *
 * @function
 * @arg {object} node - DOM element
 * @arg {object} newContainer - CSS selector or DOM element
 *
 * @example
d3.selectAll("#oldContainer .toBeMoved")
  .each(function(d, i) {
      moveNode(this, "#newContainer");
  });
 *
 * @version 0.1.0
 */
export const moveNode = (node, newContainer) =>
    select(newContainer)
    .append(
        () => select(node).remove().node()
    );

// TODO test
