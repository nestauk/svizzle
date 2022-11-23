# StyleDriver

This Svelte component provides a way to dynamically set a stylesheet and its rules. It's useful for when you need to apply styles to your application dynamically.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `href` | `string` | The URL of the stylesheet to be loaded |
| `styleRules` | `object` | An object containing the rules that should be set on the stylesheet |

## Usage

```html
<StyleDriver
	href='path/to/stylesheet.css'
	styleRules={{
		selector1: {
			property1: 'value1',
			property2: 'value2',
			...
		},
		selector2: {
			property1: 'value1',
			property2: 'value2',
			...
		},
		...
	}}
/>
```
