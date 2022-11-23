# StyleSensor

This Svelte component provides a way to dynamically read a specific CSS rule in a specific stylesheet.

It's useful to get a CSS style as a JS object in your application.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `href` | `string` | The URL of the stylesheet to be read |
| `selectorRegex` | `regexp` | A RegExp to identify the desired selector |
| `styleRules` | `object` | An object where to store the properties for the provided selector. Typically you'd bind it to a store. |

## Usage

```html
<StyleSensor
	href='/css/global.css'
	selectorRegex={/\.theme.*/u}
	bind:styleRules={$_themeVars}
/>
```
