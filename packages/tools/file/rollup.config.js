import cleanup from "rollup-plugin-cleanup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import {makeBanner} from "@svizzle/dev";

import pkg from "./package.json";

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
        cleanup()
    ]
};

export default [
    cjsConfig
];
