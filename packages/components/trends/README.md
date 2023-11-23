# Svizzle Trends Components

This package includes a set of Svelte components for visualizing trend data.
Each component is designed for customization and responsiveness, with shared
common features and props.

## Installation

To use the components, first install the Svizzle library:

```bash
npm install @svizzle/trends
```

## Components

### `StreamGraph`

Renders a sorted stream graph.

#### Unique Props
- `groups`: Defines groups for stream graph data.
- `groupToColorFn`: Function to assign colors to different groups.
- `points`: Data points for the stream graph.
- `sorting`: Sorting order of the stream graph ('off', 'asc', 'desc').

#### Events
- `areaHovered`: Emitted when an area is hovered over.
- `areaExited`: Emitted when the cursor exits an area.
- `areaTouchStarted`: Emitted when a touch starts on an area.
- `areaTouchEnded`: Emitted when a touch ends on an area.

#### Usage

\```html
<StreamGraph {groups} {points} />
\```

### `Trends`

Renders simple trend lines with optional dots.

#### Unique Props
- `hero`: Highlight a specific data point.
- `keyToColorFn`: Function to map keys to colors.
- `preformatDate`: Function to format date.
- `trends`: Data for trend lines.
- `trendType`: Type of trend ('progressive', 'cumulative').

#### Events
- `dotHovered`: Emitted when a dot is hovered over.
- `dotExited`: Emitted when the cursor exits a dot.
- `dotTouchStarted`: Emitted when a touch starts on a dot.
- `dotTouchEnded`: Emitted when a touch ends on a dot.

#### Usage

\```html
<Trends {trends} />
\```

### `PercentilesTrends`

Visualizes percentile trends.

#### Unique Props
- `areaLowKeyToColor`: Function to assign colors to area based on the lower key.
- `config`: Configuration for areas and trends.
- `items`: Data items for percentiles.
- `keyToColorFn`: Function to map keys to colors.

#### Events
- `areaHovered`: Emitted when an area is hovered over.
- `areaExited`: Emitted when the cursor exits an area.
- `areaTouchStarted`: Emitted when a touch starts on an area.
- `areaTouchEnded`: Emitted when a touch ends on an area.

#### Usage

\```html
<PercentilesTrends {items} />
\```

## Common Properties

These properties are common across all components:

- `axesLabels`: Labels for axes.
- `geometry`: Customization of graph geometry (e.g., margins, padding).
- `keyFilterFn`: Function to filter keys.
- `keyFormatFn`: Function to format keys (default: identity function).
- `keyType`: Type of key (e.g., 'date').
- `theme`: Custom theming options.
- `valueFormatFn`: Function to format values.
- `yTicksCount`: Number of ticks on the Y-axis.

Customize the components by passing in the common properties for aspects like
colors, stroke widths, and labels. Refer to the source code for detailed
information on props and customization options for each component.
