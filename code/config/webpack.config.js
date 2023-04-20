const baseConfigFactory = require("@amiga-fwk-web/tools/config/webpack.config.js");
const { inProject } = require("@amiga-fwk-web/tools-cli-utils");
const { findFile } = inProject();

// Extracted from https://github.com/andrewbents/typescript-transformer-jsx-remove-data-test-id
// which has no support for TypeScript 4.0
const ts = require("typescript");

const removeDataTestIdTransformer = () => (context) => {
  const visit = (node) =>
    ts.isJsxAttribute(node) && ["data-test-id", "data-testid"].includes(node.name.getText())
      ? undefined
      : ts.visitEachChild(node, visit, context);

  return (node) => ts.visitNode(node, visit);
};

module.exports = (env, args) => {
  const baseConfig = baseConfigFactory(env, args);
  return {
    ...baseConfig,
      entry: {
        bundle: [
          findFile("<root>/config/webpack.context.js", "<framework>/webpack.context.js"),
          "./polyfills.ts",
          "./main.tsx",
        ],
      },
    module: {
      ...baseConfig.module,
      rules: [
        ...baseConfig.module.rules,
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: require("mini-css-extract-plugin").loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: findFile("<root>/config/postcss.config.js", "<framework>/postcss.config.js")
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: "ts-loader",
              options:
                args.mode === "production"
                  ? {
                      getCustomTransformers: () => ({
                        before: [removeDataTestIdTransformer()],
                      }),
                    }
                  : {},
            },
          ],
        },
      ],
    },
    resolve: {
      ...baseConfig.resolve,
      extensions: [".ts", ".tsx", ...baseConfig.resolve.extensions],
    },
  };
};