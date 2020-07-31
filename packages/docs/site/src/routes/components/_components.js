import * as barchart from '@svizzle/barchart/src';
import * as choropleth from '@svizzle/choropleth/src';
import * as legend from '@svizzle/legend/src';
import * as histogram from '@svizzle/histogram/src';

export default {
	...barchart,
	...choropleth,
	...histogram,
	...legend,
};
