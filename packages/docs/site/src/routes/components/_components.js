import * as barchart from '@svizzle/barchart/src';
import * as choropleth from '@svizzle/choropleth/src';
import * as histogram from '@svizzle/histogram/src';
import * as legend from '@svizzle/legend/src';
import * as ui from '@svizzle/ui/src';

export default {
	...barchart,
	...choropleth,
	...histogram,
	...legend,
	...ui,
};
