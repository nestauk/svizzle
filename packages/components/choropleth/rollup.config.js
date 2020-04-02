import path from "path";

import analyze from "rollup-plugin-analyzer";
import json from "@rollup/plugin-json";
// import buble from "rollup-plugin-buble";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import {terser} from "rollup-plugin-terser";

import * as _ from 'lamb';
import {makeBanner, renameToMinJs} from "@svizzle/dev";

import pkg from "./package.json";

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
  ChoroplethDiv: 'src/ChoroplethDiv.svelte',
  ChoroplethSVG: 'src/ChoroplethSVG.svelte',
  index: 'src/index.js',
};
const treeshake = {
  annotations: true,
  moduleSideEffects: id => {
    // prevent from unadvertantly setting to false no matter what we install
    if (/@svizzle\/geo/g.test(id)) return false;
    if (/@svizzle\/utils/g.test(id)) return false;
    if (/d3-geo/g.test(id)) return false;
    if (/lamb/g.test(id)) return false;
  }
};

const cjsConfig = {
  external,
  input,
  output: {
    banner,
    dir,
    format: "cjs",
    indent: false
  },
  plugins: [
    resolve(),
    commonjs(),
    svelte(),
    cleanup(),
    json(),
  ],
  treeshake
};

const makeConfig = _.pipe([
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
      svelte(),
      cleanup(),
      json(),
      // buble({
      //   transforms: { dangerousForOf: true }
      // }),
    ],
    treeshake
  })),
  _.values
]);

const browserConfig = makeConfig(input);
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

export default [
  ...browserConfig,
  ...browserMinifiedConfig,
  cjsConfig
];
