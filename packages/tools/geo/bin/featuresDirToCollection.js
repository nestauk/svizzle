#!/usr/bin/env node -r esm

import fs from "fs";
import path from "path";

import commander from "commander";
import {featureCollection} from "@turf/helpers";

import {readJsonDir} from "@svizzle/file";
import {setGeometryPrecision} from "../src/geojson";
import {version} from "../package.json";

commander
    .version(version)
    .usage("-d <dir> -o <output> [-p precision]")
    .description("Join all .geojson files in a single GeoJSON feature collection.")
    .option("-d, --dir <dir>",
        "input dir (default: current working dir)",
        process.cwd()
    )
    .option("-o, --output <output>",
        "output file name (default: '-' for stdout)",
        "-"
    )
    .option("-p, --precision [precision]",
        "precision (default: `null` for no rounding)",
        null
    )
    .parse(process.argv);

const {dir, output, precision} = commander;

const pipeTo = output => obj => {
    if (output === "-") {
        console.log(obj);
    } else {
        fs.writeFileSync(path.resolve(output), JSON.stringify(obj), "utf8");
    }
}

readJsonDir(path.resolve(dir), "utf8")
.then(featureCollection)
.then(setGeometryPrecision(precision))
.then(pipeTo(output))
