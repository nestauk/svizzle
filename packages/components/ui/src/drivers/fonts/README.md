# FontsLoader Component

This component provides fine control over custom font loading by using the Font
Loading API.

## Demo

You can visit the [doc site](https://nestauk.github.io/svizzle/) to see it in
action.

## Usage

```svelte
<script>
	import FontsLoader
		from '@svizzle/ui/src/drivers/fonts/FontsLoader.svelte';

	let fontLoadStatus;
</script>

<FontsLoader
	bind:status={fontLoadStatus}
	firstFamilyToLoad='Archivo'
	families={[
		{
			family: 'Avenir Next Variable',
			faces: [
				{
					src: 'url(/svizzle/font/AvenirNext/Variable.ttf) format("truetype")'
				}
			]
		},
		{
			family: 'Archivo',
			faces: [
				{
					src: 'url(/svizzle/font/Archivo/VariableFont_wdth,wght.ttf) format("truetype")',
					descriptors: {
						style: 'normal'
					}
				},
				{
					src: 'url(/svizzle/font/Archivo/Italic-VariableFont_wdth,wght.ttf) format("truetype")',
					descriptors: {
						style: 'italic'
					}
				},
			]		
		},
		{
			family: 'Courier New'
		}
	]}
/>

{#if fontLoadStatus?.isFirstLoaded}
	<div>Content that depend on the first family being loaded.</div>
{/if}
```

For a full implementation example please refer to
`packages/docs/site/src/routes/_layout.svelte`.

Props:
- `families`: An array of objects of shape `{family: string, faces: {src: string, descriptors: []}}` describing the families and typefaces to load.
  - If no `faces` array is provided the component will assume the family refers to a preinstalled system font, essentially ignoring it. This is useful for apps that need to keep track of all fonts used in a single centralized location.
  - For information on the `descriptors` object please refer to https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace. 
- `firstFamilyToLoad`: If set to a family name in the list of families, this `string` property informs the component what family of typefaces to load first
- `status`: This property of shape `{isFirstLoaded: boolean, isDone: boolean}` can be bound to for receiving the status of the font loading process.
