import * as _ from "lamb";

import * as d3 from "../vendor/d3";

import {mapValuesToFloatPossibly} from "@svizzle/utils";

/* get */

/**
 * Return an object derived from getComputedStyle(domNode) with values converted to numbers.
 * It extracts values for `width`, `height` and all keys in `additionalProps`.
 *
 * @function
 * @arg {object} DOM element
 * @arg {array} additionalProps
 * @return {object}
 *
 * @example
getElementGeometry(node)
// {width: 200, height: 100}

getElementGeometry(node, ["font-size"])
// {width: 200, height: 100, "font-size": 12}
 *
 * @version 0.1.0
 */
export const getElementGeometry = (elem, additionalProps = []) =>
    mapValuesToFloatPossibly(
        _.pick(getComputedStyle(elem), [
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
 * @arg {object} newContainer - DOM element
 *
 * @example
d3.selectAll("container1 .toBeMoved")
  .each(function(d, i) {
      moveNode(this, "container2");
  });
 *
 * @version 0.1.0
 */
export const moveNode = (node, newContainer) =>
    d3.select(newContainer).append(
        () => d3.select(node).remove().node()
    );

// TODO test with jsdom
