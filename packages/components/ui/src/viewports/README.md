# Viewports

You can render renders the content of a `View` having the `id` equal to the `viewId` passed to the parent viewport.

We provide 2 types of viewport:
- `ViewsXor.svelte`: renders the content of the `View` that has `id` equal to its `viewId`
- `ViewsSlider.svelte`: renders all views and translate them in such a way that the `View` that has `id` equal to its `viewId` is visible

For example, the below code can be used to make a route responsive, by rendering a `medium` or a `small` view:

```
<ViewsXor viewId={$_screenId}>
	<View id='medium'>
		<ExplorerMedium>
			<slot />
		</ExplorerMedium>
	</View>
	<View id='small'>
		<ExplorerSmall>
			<slot />
		</ExplorerSmall>
	</View>
</ViewsXor>
```

Please check the website at these pages for further details:
- `/svizzle/compounds/viewports/ViewsXor`
- `/svizzle/compounds/viewports/ViewsSlider`
