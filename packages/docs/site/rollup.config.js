import path from 'node:path';
import {fileURLToPath} from 'node:url';

import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import alias from 'rollup-plugin-alias';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import {terser} from 'rollup-plugin-terser';
import yaml from '@rollup/plugin-yaml';

import config from 'sapper/config/rollup.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const appRoot = path.join(__dirname, 'src/lib');
const aliasConfig = alias({
	resolve: ['.js', 'svelte'],
	entries: [
		{find: '$lib', replacement: appRoot}
	]
});

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = Boolean(process.env.SAPPER_LEGACY_BUILD);
const preserveEntrySignatures = false;

const onwarn = (warning, _onwarn) =>
	warning.code === 'MISSING_EXPORT' &&
		(/'preload'/u).test(warning.message) ||
	warning.code === 'CIRCULAR_DEPENDENCY' ||
	_onwarn(warning);

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
				dedupe: ['svelte']
			}),
			commonjs(),
			json(),
			yaml(),
			aliasConfig,

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
			/* eslint-disable-next-line global-require */
			require('module').builtinModules ||
			Object.keys(process.binding('natives')),
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
			yaml(),
			aliasConfig,
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
			yaml(),
			aliasConfig,
			!dev && terser()
		],
		preserveEntrySignatures,
	}
};
