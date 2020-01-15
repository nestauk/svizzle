import path from "path";
import analyze from "rollup-plugin-analyzer";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import {makeBanner} from "@svizzle/dev";

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
  moduleSideEffects: true,
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
        analyzer
    ],
    treeshake
};

export default [
    cjsConfig
];
