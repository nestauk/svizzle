import path from 'path';

// import buble from 'rollup-plugin-buble';
import {terser} from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

import * as _ from 'lamb';
import {makeBanner, renameToMinJs} from '@svizzle/dev';

import pkg from './package.json';
import rollupIconsInputFeather from './rollup/rollupIconsInputFeather.json';

const analyzer = analyze({
	limit: 15,
	root: path.resolve('../../../'),
	stdout: true,
	summaryOnly: true
});
const banner = makeBanner(pkg);
const dir = 'dist';
const external = pkg.peerDependencies && Object.keys(pkg.peerDependencies) || [];

const input = {
	...rollupIconsInputFeather,
	A11yPerson: 'src/icons/svizzle/A11yPerson.svelte',
	defaults: 'src/defaults.js',
	Icon: 'src/icons/Icon.svelte',
	index: 'src/index.js',
	Link: 'src/Link.svelte',
	LinkButton: 'src/LinkButton.svelte',
	LoadingView: 'src/LoadingView.svelte',
	MessageView: 'src/MessageView.svelte',
	ScreenGauge: 'src/gauges/screen/ScreenGauge.svelte',
	Switch: 'src/Switch.svelte',
};
const removeComments = cleanup({
	extensions: ['js', 'mjs']
});
const treeshake = {
	annotations: true,
	moduleSideEffects: id =>
		// prevent from unadvertantly setting to false no matter what we install
		!(/@svizzle\/dom/gu).test(id)
		|| !(/uid/gu).test(id)
		// || !(/@svizzle\/utils/gu).test(id)
		// || !(/just-compare/gu).test(id)
		// || !(/lamb/gu).test(id)
}

const makeBrowserConfig = _.pipe([
	_.mapValuesWith((value, name) => ({
		external,
		input: value,
		output: {
			banner,
			file: `${dir}/${name}.browser.js`,
			format: 'umd',
			name: `${pkg.name}/${name}`,
			indent: false
		},
		plugins: [
			resolve(),
			commonjs(),
			svelte({
				emitCss: false
			}),
			removeComments,
			// json(),
			// buble({
			//	 transforms: { dangerousForOf: true }
			// }),
		],
		treeshake
	})),
	_.values
]);

const browserConfig = makeBrowserConfig(input);
const browserMinifiedConfig = browserConfig.map(obj => ({
	...obj,
	output: {
		...obj.output,
		file: renameToMinJs(obj.output.file)
	},
	plugins: [
		...obj.plugins,
		terser({
			output: {
				preamble: obj.output.banner
			}
		}),
		analyzer
	],
	treeshake
}));

const cjsConfig = {
	external,
	input,
	output: {
		banner,
		dir,
		format: 'cjs',
		indent: false
	},
	plugins: [
		resolve(),
		commonjs(),
		svelte({
			emitCss: false
		}),
		removeComments,
	],
	treeshake
};

export default [
	...browserConfig,
	...browserMinifiedConfig,
	cjsConfig
];
