/**
* @module @svizzle/utils/array-[object-object]
*/

import * as _ from 'lamb';

/**
 * Return a function that expects an object and applies the provided sequence of transforms to the values of the correspondent paths to the input object.
 * Not that transforms to the same path can be repeated.
 *
 * @function
 * @arg {array} pathFnPairs - pairs [path, function]
 * @return {function} - Object -> Object
 *
 * @example

> obj = {
  a: {
    a1: 'a1',
    a2: {
      a21: 'a21',
      a22: '9',
    },
    a3: '3px',
    a4: '2',
  },
  b: {
    b1: 'b1',
    b2: {
      b21: 'foo',
      b22: '9',
      b23: '2',
      b24: '24px'
    },
    b3: '2',
    b4: '4px'
  },
}

> // orthogonal transforms
> transform = applyTransformsSequence([
  ['a.a2.a22', _.pipe([Number, Math.sqrt])],
  ['a.a3', parseInt],
  ['b.b2.b24', parseInt],
  ['b.b4', parseInt],
])
> transform(obj)
{
  a: {
    a1: 'a1',
    a2: {
      a21: 'a21',
      a22: 3,
    },
    a3: 3,
    a4: '2'
  },
  b: {
    b1: 'b1',
    b2: {
      b21: 'foo',
      b22: '9',
      b23: '2',
      b24: 24
    },
    b3: '2',
    b4: 4
  },
}

> // modifying modified paths
> transform = applyTransformsSequence([
  ['b', _.values],
  ['b.1', _.values],
])
> transform(obj)
{
  a: {
    a1: 'a1',
    a2: {
      a21: 'a21',
      a22: '9',
    },
    a3: '3px',
    a4: '2',
  },
  b: [
    'b1',
    [
      'foo',
      '9',
      '2',
      '24px',
    ],
    '2',
    '4px'
  ],
}

> // modifying paths multiple times
> transform = applyTransformsSequence([
  ['b', _.values],
  ['b.1', _.values],
  ['b', _.flatten],
])
> transform(obj)
{
  a: {
    a1: 'a1',
    a2: {
      a21: 'a21',
      a22: '9',
    },
    a3: '3px',
    a4: '2',
  },
  b: [
    'b1',
    'foo',
    '9',
    '2',
    '24px',
    '2',
    '4px'
  ],
}
 * @version 0.6.0
 * @see {@link module:@svizzle/utils/object-[object-object].applyFnMap|applyFnMap}
 * @see {@link module:@svizzle/utils/object-[object-object].transformValues|transformValues}
 * @see {@link module:@svizzle/utils/object-[object-object].transformPaths|transformPaths}
 */
export const applyTransformsSequence = pathFnPairs => obj =>
	_.reduce(pathFnPairs, (acc, [path, fn]) => {
		const value = _.getPathIn(acc, path);

		return _.setPathIn(acc, path, _.application(fn, [value]))
	}, _.merge({}, obj));

/**
 * Return a function plucking the provided keys from the expected object values
 *
 * @function
 * @arg {array} keys - array of keys to pluck
 * @return {function} - Object -> Object
 *
 * @example
> let select = pluckValuesKeys(['a', 'k'])
> select({
	foo: {a: 1, b: 2, c: 3, k: 4},
	bar: {a: 5, b: 8}
})
{
	foo: {a: 1, k: 4},
	bar: {a: 5}
}
 *
 * @version 0.8.0
 * @see https://ascartabelli.github.io/lamb/module-lamb.html#pluckKey
 */
export const pluckValuesKeys = keys => _.mapValuesWith(_.pickKeys(keys));
