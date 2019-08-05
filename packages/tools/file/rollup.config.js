import path from "path";
import analyze from "rollup-plugin-analyzer";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import {makeBanner} from "@svizzle/dev";

import pkg from "./package.json";

const analyzer = analyze({
  limit: 10,
  root: path.resolve('../../../'),
  stdout: true,
  summaryOnly: true
});
const treeshake = {
  annotations: true,
  moduleSideEffects: false,
};

const cjsConfig = {
    input: pkg.module,
    output: {
        banner: makeBanner(pkg),
        file: pkg.main,
        format: "cjs",
        indent: false
    },
    plugins: [
        resolve(),
        commonjs(),
        cleanup(),
        analyzer
    ],
    treeshake
};

export default [
    cjsConfig
];
