import path from "path";

import autoPreprocess from 'svelte-preprocess';
import analyze from "rollup-plugin-analyzer";
import json from "@rollup/plugin-json";
// import buble from "rollup-plugin-buble";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import {terser} from "rollup-plugin-terser";

import {makeBanner, renameToMinJs} from "@svizzle/dev";

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
const preprocess = autoPreprocess();
const treeshake = {
  annotations: true,
  moduleSideEffects: id => {
    // prevent from unadvertantly setting to false no matter what we install
    if (/@svizzle\/dom/g.test(id)) return false;
    if (/@svizzle\/utils/g.test(id)) return false;
    if (/just-compare/g.test(id)) return false;
    if (/lamb/g.test(id)) return false;
  }
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
    svelte({preprocess}),
    cleanup(),
    json(),
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
      svelte({preprocess}),
      cleanup(),
      json(),
      // buble({
      //   transforms: { dangerousForOf: true }
      // }),
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
        preamble: browserConfig.output.banner
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
