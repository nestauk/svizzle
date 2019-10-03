/**
* @module @svizzle/utils/string-string
*/

import * as _ from "lamb";

import {sliceStringAt} from "./array-[string-string]";
import {sliceString} from "./string_proto-string";
import {endsWithNewLine} from "./string-boolean";

/**
 * Trim the last char of the provided string if it's a newline
 *
 * @function
 * @arg {string} string
 * @return {array}
 *
 * @example
 * trimLastNewline("a\nb\nc") // "a\nb\nc"
 * trimLastNewline("a\nb\nc\n") // "a\nb\nc"
 * trimLastNewline("a\nb\nc\n\n") // "a\nb\nc\n"
 *
 * @version 0.5.0
 */
export const trimLastNewline =
  _.when(endsWithNewLine, sliceStringAt([0, -1]));
