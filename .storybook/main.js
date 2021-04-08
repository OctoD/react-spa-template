const path = require("path")

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          'src': toPath(`src`),
          'app': toPath('src/app'),
          'components': toPath('src/components'),
          'hooks': toPath('src/hooks'),
          'hocs': toPath('src/hocs'),
          'locales': toPath('src/locales.mjs'),
          'routes': toPath('src/routes.ts'),
          'store': toPath('src/store'),
          'types': toPath('src/types'),
          'theme': toPath('src/theme'),
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    }
  },
}
