module.exports = {
  parser: "babel-eslint",

  plugins: ["react", "react-native"],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,

      modules: true
    }
  },

  extends: ["eslint:recommended", "plugin:react/recommended", "airbnb-base"],

  rules: {
    "arrow-body-style": "warn",

    quotes: ["error", "double"],

    "linebreak-style": ["error", "windows"],

    "comma-dangle": ["error", "never"],

    "no-use-before-define": ["error", { variables: false }]
  }
};
