# UI

A set of UI components for Svelte.

## Icons

A collection of some of Feather icons; the SVGs are taken from https://github.com/feathericons/feather/tree/master/icons.

## Switch

A simple toggle between 2 values.

## Gauge components

These are components that we instantiate to measure some feature of the device/browser.

### Screen Gauge

Measures screen features reactively, see [here](src/gauges/screen).

## Breakpoints

```
import {breakpoints} from '@svizzle/ui/src/defaults';
```

A set of breakpoints for responsiveness, expressed in amount of chars fitting the screen width for responsive layouts (`[45, 90, 135, 180]`), see [here](https://github.com/nestauk/eurito_indicators_ui/issues/7#issuecomment-790848997).

The bands among breakpoints can be thought as T-shirt sizes:
```
       45      90      135     180
xSmall | small | medium | large | xLarge
```

![breakpoints and bands](./doc/breakpoints.png)
