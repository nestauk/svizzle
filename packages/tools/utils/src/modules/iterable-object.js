/**
* @module @svizzle/utils/iterable-object
*/

/**
 * Return the {key, value} object from a pair
 *
 * @function
 * @arg {iterable} iterable
 * @return {object}
 *
 * @example
> function func () {
	return pairToKeyValueObject(arguments);
}
> func()
{key: undefined, value: undefined}
> func(1)
{key: 1, value: undefined}
> func(1, 2)
{key: 1, value: 2}
> func(1, 2, 3)
{key: 1, value: 2}
> pairToKeyValueObject([])
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject([1])
{key: 1, value: undefined}
> pairToKeyValueObject([1, 2])
{key: 1, value: 2}
> pairToKeyValueObject([1, 2, 3])
{key: 1, value: 2}
> pairToKeyValueObject('')
{key: 'undefined', value: 'undefined'}
> pairToKeyValueObject('a')
{key: 'a', value: 'undefined'}
> pairToKeyValueObject('ab')
{key: 'a', value: 'b'}
> pairToKeyValueObject('abc')
{key: 'a', value: 'b'}
 *
 * @since 0.1.0
 */
export const pairToKeyValueObject = ([key, value]) => ({key, value});

/**
 * Return the {key, values} object from a pair
 *
 * @function
 * @arg {iterable} iterable
 * @return {object}
 *
 * @example
> function func () {
	return pairToKeyValuesObject(arguments);
}
> func()
{key: undefined, values: undefined}
> func(1)
{key: 1, values: undefined}
> func(1, [1, 2])
{key: 1, values: [1, 2]}
> func(1, [1, 2], 3)
{key: 1, values: [1, 2]}
> pairToKeyValuesObject([])
{key: 'undefined', values: 'undefined'}
> pairToKeyValuesObject([1])
{key: 1, values: undefined}
> pairToKeyValuesObject([1, [1, 2]])
{key: 1, values: [1, 2]}
> pairToKeyValuesObject([1, [1, 2], 3])
{key: 1, values: [1, 2]}
> pairToKeyValuesObject('')
{key: 'undefined', values: 'undefined'}
> pairToKeyValuesObject('a')
{key: 'a', values: 'undefined'}
> pairToKeyValuesObject('ab')
{key: 'a', values: 'b'}
> pairToKeyValuesObject('abc')
{key: 'a', values: 'b'}
 *
 * @since 0.21.0
 */
export const pairToKeyValuesObject = ([key, values]) => ({key, values});
