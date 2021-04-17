import babel from "rollup-plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

import postcss from "rollup-plugin-postcss";

import less from "rollup-plugin-less";
import commonjs from "@rollup/plugin-commonjs";

import rollupTypescript from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from "@babel/core";
const postcssUrl = require("postcss-url");

// rollup.config.js
export default {
  // core
  input: "./src/index.tsx", // required
  output: {
    // required
    // core
    file: "./lib/bundle.js", // required
    format: "cjs", // required
    // globals,
    // name,

    // paths,
    // banner,
    // footer,
    // intro,
    // outro,
    sourcemap: false,
    // sourcemapFile,
    // interop,

    // exports,
    // amd,
    // indent
    // strict
  },
  plugins: [
    external(),
    rollupTypescript(),
    postcss({
      inject: true,
      include: ["node_modules/react-dates/lib/css/*.css"],
      extract: false,
      minimize: true,
      plugins: [
        postcssUrl({
          filter: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          url: (asset) => `fonts/${asset.url.substr(1).split("/").pop()}`,
        }),
      ],
    }),
    less({
      // include: ["node_modules/shineout/lib/styles/*.less", '**/*.less', '**/*.css'],
      insert: true,
      output: false,
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
  external: [
    "react",
    "react-dom",
    // "lodash",
    // "@material-ui/core",
    // "@material-ui/icons",
    // "@material-ui/lab",
    // "react-hook-form",
    // "react-dates",
    // "moment",
    // "shineout",
  ],
  // onwarn,

  // danger zone
  // acorn,
  // context,
  // moduleContext,
  // legacy
};
