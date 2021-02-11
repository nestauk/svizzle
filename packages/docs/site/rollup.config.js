import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = Boolean(process.env.SAPPER_LEGACY_BUILD);
const preserveEntrySignatures = false;

const onwarn = (warning, _onwarn) =>
	warning.code !== 'CIRCULAR_DEPENDENCY' && _onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		onwarn,
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				compilerOptions: {
					dev,
					hydratable: true,
				},
				emitCss: true,
			}),
			resolve({
				/* disabled as this makes the build fail with
				> 'makeStyle' is not exported by ../../tools/dom/dist/browser.js, imported by ../../components/barchart/src/BarchartV.svelte
				*/
				// browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			json(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],
		preserveEntrySignatures,
	},

	server: {
		external:
			Object.keys(pkg.dependencies)
			.filter(name => ![
				'@svizzle/barchart',
				'@svizzle/choropleth',
				'@svizzle/utils',
				'svelte-json-tree',
			].includes(name))
			.concat(
				/* eslint-disable-next-line global-require */
				require('module').builtinModules ||
				Object.keys(process.binding('natives'))
			),
		input: config.server.input(),
		onwarn,
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				compilerOptions: {
					dev,
					generate: 'ssr',
				},
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			json(),
		],
		preserveEntrySignatures,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		onwarn,
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			json(),
			!dev && terser()
		],
		preserveEntrySignatures,
	}
};
