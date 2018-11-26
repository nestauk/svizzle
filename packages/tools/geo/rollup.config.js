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

const input = pkg.module;
const banner = makeBanner(pkg);

const cjsConfig = {
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
        cleanup()
    ]
};

const browserConfig = {
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
        buble()
    ]
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
        })
    ]
};

export default [
    browserConfig,
    browserMinifiedConfig,
    cjsConfig
];
