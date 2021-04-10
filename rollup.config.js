import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import less from "rollup-plugin-less";
import css from "rollup-plugin-css-only";
import commonjs from "@rollup/plugin-commonjs";

import rollupTypescript from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from "@babel/core";

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
    sourcemap: true,
    // sourcemapFile,
    // interop,

    // exports,
    // amd,
    // indent
    // strict
  },
  plugins: [
    rollupTypescript(),
    postcss({
      modules: true,
      include: ["node_modules/react-dates/lib/css/*.css"],
      // extract: 'dist/my-custom-file-name.css'
    }),
    less({
      insert: true,
      output: "./lib/bundle.css",
    }),
    // css(),
    babel({
      exclude: "node_modules/**",
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
    }),
    commonjs(),
  ],
  external: [
    "react",
    "react-dom",
    "lodash",
    "@material-ui/core",
    "@material-ui/icons",
    "@material-ui/lab",
    "@material-ui/core/styles",
    "react-hook-form",
    "react-dates",
    "moment",
    "shineout",
  ],
  // onwarn,

  // danger zone
  // acorn,
  // context,
  // moduleContext,
  // legacy
};
