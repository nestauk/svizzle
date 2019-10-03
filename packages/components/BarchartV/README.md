# BarchartV

Vertical barchart.

## Props

### `shouldResetScroll`

If `true`, updating the props will reset the scroll.

Type: `boolean`

Default: `false`

### `focusedKey`

The focused bar key, if any.

Type: `string`

Default: `undefined`

### `interactive`

If true emits events when interacting with the bars, the payload being an object `{id: key}`, where `key` is the key of the bar we interact with:

- clicking on a bar dispatches a `clicked` event:

   `dispatch('clicked', {id: key})`
- mouse-entering a bar dispatches a `entered` event:

   `dispatch('entered', {id: key})`
- mouse-exiting a bar dispatches a `entered` event:

   `dispatch('exited', {id: key})`

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

Mapping key -> bar colour string.

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

A function taking a key and returning the bar label.

Type: `function`

Default: `undefined`

Example:

```js
key => {
  ...

  return colourString;
}
```

### `labels`

Mapping key -> bar label.

Type: `object`

Default: `undefined`

Example:

```js
{
  foo: 'Foo',
  bar: 'Bar',
}
```

### `title`

If provided, show the component title.

Type: `string`

Default: `undefined`

### `valueAccessor`

The `value` accessor. By default we assume that `items` has the shape `{key, value}`.

Type: `function`

Default: [`getValue`](https://nestauk.github.io/svizzle/module-@svizzle_utils_object-any.html#.getValue)
