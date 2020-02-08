# BarchartV

Vertical barchart.

## Props

### `defaultColor`

The default bar color, if any.

If not provided bars will render in the default `background-color` of the page (most probably be `black`).

Type: `string`

Default: `null`

### `focusedKey`

The focused bar key, if any.

Type: `string`

Default: `undefined`

### `isInteractive`

If true emits events when interacting with the bars, the payload being an object `{id: key}` (`key` being the key of the bar we interacted with):

Clicking on a bar dispatches a `clicked` event: `dispatch('clicked', {id: key})`.

Mouse-entering a bar dispatches a `entered` event: `dispatch('entered', {id: key})`.

Mouse-exiting a bar dispatches a `entered` event: `dispatch('exited', {id: key})`.

Type: `boolean`

Default: `false`

### `items`

The bar items to be displayed.

Type: `array`

Default: `undefined`

Example:

```js
[
  {key: 'foo', value: 2},
  {key: 'bar', value: 34}
]
```

### `keyToColor`

By providing a object mapping bar key -> bar color, you can control the bars colour.

Notice that the default color for keys not in `keyToColor` is black.

Type: `object`

Default: `undefined`

Example:

```js
{
  foo: 'yellow',
  bar: '#ff0000',
}
```

### `keyToLabel`

By providing a object mapping bar key -> bar label, you can control how the bar are labeled.

Type: `object`

Default: `undefined`

Example:

```js
{
  foo: 'Foo',
  bar: 'Bar',
}
```

### `keyToLabelFn`

By providing a function mapping bar key -> bar label, you can control how the bar are labeled programmatically.

Type: `function`

Default: `undefined`

Example:

```js
key => {
  ...

  return newKey;
}
```

### `title`

If provided, show the component title.

Type: `string`

Default: `undefined`

### `shouldResetScroll`

If `true`, updating the props will reset the scroll.

Type: `boolean`

Default: `false`

### `valueAccessor`

The `value` accessor. By default we assume that `items` has the shape `{key, value}`.

Type: `function`

Default: [`getValue`](https://nestauk.github.io/svizzle/module-@svizzle_utils_object-any.html#.getValue)
