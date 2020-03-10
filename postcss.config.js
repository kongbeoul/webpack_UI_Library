module.exports = ({ ctx }) => {
  return {
    plugins: [
      require("postcss-import")({}),
      require("postcss-preset-env")({
        stage: 0,
        features: {
          "nesting-rules": true
        },
        preserve: false,
        autoprefixer: true,
        importFrom: "./src/css/variables.css"
      })
    ]
  };
};
