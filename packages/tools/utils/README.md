## `@svizzle/utils`

Svizzle Utils is a library to help transforming data types.

https://nestauk.github.io/svizzle

### Installation

*npm*


`npm i -S @svizzle/utils`

*browser*

```
<script src="https://unpkg.com/@svizzle/utils">
```

### Directory structure

In this package, *the modules path tries to convey the type signature* of the functions in the module.

For example:

- [`@svizzle/utils/array/object`](https://nestauk.github.io/svizzle/module-@svizzle_utils_array_object.html) contains functions expecting an array and returning an object:

  `Array -> Object`.

  For example, `makeAllOccurrences` expects an `Array` of objects and returns an `Object` of occurrences of all the keys.

  ```js
  const objects = [{a: 1}, {a: 6, b: -1}, {a: 2, b: 0, c: 1}, {c: 4, e: 2}];

  makeAllOccurrences(objects) // {a: 3, b: 2, c: 2, e: 1}
  ```

  Sometimes a function expects more than one argument: in this case the directory reports the type of the first argument.

  For example `makeOccurrences` expects two `Array`s and return an object of occurrences of keys in the provided array containing the provided keys:

  ```js
  > objects = [{a: 1}, {a: 6, b: -1}, {a: 2, b: 0, c: 1}, {c: 4, e: 2}];

	> makeOccurrences(objects, ['a', 'b'])
	{a: 3, b: 2}
	> makeOccurrences(objects, ['c', 'e'])
	{c: 2, e: 1}
	> makeOccurrences(objects, ['k', 'a'])
	{k: 0, a: 3}
  ```

- Similarly, [`@svizzle/utils/array_proto-string`](https://nestauk.github.io/module-@svizzle_utils_array_proto-string.html) contains functions derived from the `Array.prototype` hence expecting an `Array` as a first argument (and potentially other arguments of different type) and returning a `String`:

  `(Array, *+) -> String`.

  For example, `join` expects an `Array` and a `String` and returns an `String`.

  ```js
	> join([0, 1, 2], '-')
	'0-1-2'
  ```

- [`@svizzle/utils/array-[number-boolean]`](https://nestauk.github.io/svizzle/module-@svizzle_utils_array-%255Bnumber-boolean%255D.html) contains functions expecting an `Array` and returning a function expecting an `Number` and returning a `Boolean`:

  `Array -> (Number -> Boolean)`.

  For example, `makeIsWithinRange` expects a range (an `Array`) and returns a function expecting a `Number` and returning if that number is within the given range or not (a `Boolean`).

  ```js
  > isWithinRange = makeIsWithinRange([0, 5]);
	> isWithinRange(2)
	true
	> isWithinRange(8)
	false
  ```
