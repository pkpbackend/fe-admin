const path = require("path")

module.exports = {
  reactScriptsVersion: "react-scripts",
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ["node_modules", "src/assets"]
        }
      }
    },
    postcss: {
      plugins: [require("postcss-rtl")()]
    }
  },
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/@core/assets"),
      "@components": path.resolve(__dirname, "src/@core/components"),
      "@customcomponents": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/@core/layouts"),
      "@store": path.resolve(__dirname, "src/redux"),
      "@styles": path.resolve(__dirname, "src/@core/scss"),
      "@configs": path.resolve(__dirname, "src/configs"),
      "@utils": path.resolve(__dirname, "src/utility"),
      "@hooks": path.resolve(__dirname, "src/utility/hooks"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@globalapi": path.resolve(__dirname, "src/api/domains"),
      "@api": path.resolve(__dirname, "src/api"),
      "@views": path.resolve(__dirname, "src/views")
    }
  }
}
