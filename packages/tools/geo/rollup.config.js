import path from "path";
import analyze from "rollup-plugin-analyzer";
import buble from "rollup-plugin-buble";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import {terser} from "rollup-plugin-terser";

import {
	makeBanner,
	renameToMinJs
} from "@svizzle/dev";

import pkg from "./package.json";

const analyzer = analyze({
	limit: 15,
	root: path.resolve('../../../'),
	stdout: true,
	summaryOnly: true
});
const banner = makeBanner(pkg);
const external = pkg.peerDependencies && Object.keys(pkg.peerDependencies) || [];
const input = pkg.module;
const treeshake = {
	annotations: true,
	moduleSideEffects: [
		// bin/featuresDirToCollection.js, unused by the lib
		// currently used @turf/* have all `sideEffects: false`
		'@svizzle/file',
		'commander'
	],
};

const cjsConfig = {
	external,
	input,
	output: {
		banner,
		file: pkg.main,
		format: "cjs",
		indent: false
	},
	plugins: [
		resolve(),
		commonjs(),
		cleanup(),
	],
	treeshake
};

const browserConfig = {
	external,
	input,
	output: {
		banner,
		file: pkg.browser,
		format: "umd",
		name: pkg.name,
		indent: false
	},
	plugins: [
		resolve(),
		commonjs(),
		cleanup(),
		buble({objectAssign: 'Object.assign'}),
	],
	treeshake
};

const browserMinifiedConfig = {
	...browserConfig,
	output: {
		...browserConfig.output,
		file: renameToMinJs(browserConfig.output.file)
	},
	plugins: [
		...browserConfig.plugins,
		terser({
			output: {
				preamble: banner
			}
		}),
		analyzer
	],
	treeshake
};

export default [
	browserConfig,
	browserMinifiedConfig,
	cjsConfig
];
