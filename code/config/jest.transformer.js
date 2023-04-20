const { inProject } = require("@amiga-fwk-web/tools-cli-utils");
const { findFile } = inProject();

const path = require("path");
const { createTransformer } = require("babel-jest").default;
const babelConfig = require(findFile("<root>/config/babel.config.js", "<framework>/babel.config.js"));
const p = (...parts) => path.join(process.cwd(), ...parts);

// Custom Jest transformer.
// It uses babel-jest and the framework's babel configuration.
// It also provides support for the resolvers and aliases
// defined in the framework's webpack config.
module.exports = createTransformer({
  ...babelConfig,
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: [p("src"), p("test")],
        extensions: [".js", ".jsx", ".es", ".es6", ".mjs", ".tsx", ".ts"],
        alias: {
          root: p(),
          "@": p("src"),
          "#": p("test"),
          config: p("config"),
        },
      },
    ],
    ...babelConfig.plugins,
  ],
});
