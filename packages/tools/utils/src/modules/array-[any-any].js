/**
* @module @svizzle/utils/array-[any-any]
*/

/**
 * Return a function that maps the input to the first or the second element of the provided pair: the first if its truthy, the second otherwise.
 *
 * @function
 * @arg {array} pair - Pair of output values
 * @return {function} - Any -> Any
 *
 * @example
> boolToNum = truthynessTo([0, 1])
> boolToNum(true)
0
> boolToNum(false)
1

> boolToString = truthynessTo(['OK!', 'Sorry!'])
> boolToString(true)
'OK!'
> boolToString(false)
'Sorry!'

> numToString = truthynessTo(['OK!', 'Sorry!'])
> numToString(3)
'OK!'
> numToString(0)
'Sorry!'

> stringToString = truthynessTo(['OK!', 'Sorry!'])
> stringToString('hey')
'OK!'
> stringToString('')
'Sorry!'

> stringToObject = truthynessTo([{value: 1}, {value: -1}])
> stringToObject('hey')
{value: 1}
> stringToObject('')
{value: -1}
 *
 * @version 0.14.0
 */
export const truthynessTo =
	([valueIfTruthy, valueIfFalsy]) => x => x ? valueIfTruthy : valueIfFalsy;
