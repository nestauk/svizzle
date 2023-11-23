# Treemap Component

The `Treemap` Svelte component from the Svizzle library is designed for
visualizing hierarchical data using a treemap layout.

## Overview

The `Treemap` component uses a treemap layout to represent hierarchical data as
a set of nested rectangles. Each branch of the tree is given a rectangle, which
is then tiled with smaller rectangles representing sub-branches.

Note that in this version the `Treemap` doesn't support hierarchies with more
than one level of depth as we are for now porting it as-is from a project where
we didn't have a deeper data structure.

## Installation

To use the `Treemap` component, first install the Svizzle library:

```bash
npm install @svizzle/hierarchy
```

## Usage

Here's a basic example of how to use the `Treemap` component in your Svelte
application:

```html
<script>
  import {Treemap} from '@svizzle/ui';
  // Import or define your data
  const items = [/* your hierarchical data */];
</script>

<Treemap {items} />
```

## Props

- `items`: The hierarchical data to be displayed. This should be an array of objects.
- `geometry`: Optional. An object to customize the layout of the treemap, including padding and text positioning.
- `keyAccessor`: Optional. A function to access the key from each data item (default is `getKey`).
- `valueAccessor`: Optional. A function to access the value from each data item (default is `getValue`).
- `keyToColorFn`: Optional. A function to determine the color of each rectangle based on its key.
- `keyToColorLabelFn`: Optional. A function to determine the color of the label text for each rectangle.

## Features

- **Responsive Design**: Automatically adjusts to the container's size.
- **Customizable Layout**: Control over text positioning and rectangle padding.
- **Interactive**: Dispatches events for mouse and touch interactions on the treemap leaves.
- **Color Customization**: Functions to define custom colors for rectangles and labels.

## Events

The component dispatches several events for interaction:

- `leafHovered`: Fired when a leaf is hovered over.
- `leafExited`: Fired when the mouse exits a leaf.
- `leafTouchStarted`: Fired when a touch interaction starts on a leaf.
- `leafTouchEnded`: Fired when a touch interaction ends on a leaf.
