const path = require('path');

module.exports = {
  "root": true,
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "node": true,
      "jest": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "eslint-plugin-flowtype",
      "eslint-plugin-import",
      "eslint-plugin-jest",
      "eslint-plugin-jsx-a11y",
      "eslint-plugin-react",
      "react",
      "json"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": {
            "extensions": [
              "*", ".json",
              ".js", ".jsx", ".css"
            ],
            "modules": [
              path.join(__dirname, "/src"),
              path.join(__dirname, "/node_modules")
            ]
          }
        }
      },
      "node": {
        "paths": ["src", "node_modules"],
        "extensions": [
              "*", ".json",
              ".js", ".jsx", ".css"
            ],
      }
    }
  },
  "rules": {
    "arrow-body-style": 0,
    "comma-spacing": 2,
    "max-len": ["error", { "code": 140 }],
    "quotes": ["error", "single"],
    "no-console": 2,
    "no-bitwise": 0,
    "no-constant-condition": 2,
    "no-debugger": 2,
    "no-var": 2,
    "comma-dangle": 0,
    "semi": [2, "never"],
    "no-trailing-spaces": 2,
    "no-multi-spaces": 1,
    "object-curly-spacing": [2, "always"],
    "eol-last": 2,
    "no-underscore-dangle": 0,
    "no-alert": 2,
    "no-lone-blocks": 2,
    "jsx-quotes": 1,
    "object-curly-newline": 0,
    "function-paren-newline": 0,
    "react/display-name": [ 1, {"ignoreTranspilerName": false }],
    "react/forbid-prop-types": 0,
    "react/jsx-boolean-value": 2,
    "react/jsx-closing-tag-location": 2,
    "react/jsx-closing-bracket-location": [1, "after-props"],
    "react/jsx-curly-spacing": 2,
    "react/jsx-indent-props": [2, 2],
    "react/jsx-key": 2,
    "react/jsx-max-props-per-line": 2,
    "react/jsx-no-bind": 2,
    "react/jsx-no-duplicate-props": 1,
    "react/jsx-no-literals": 0,
    "react/jsx-no-undef": 1,
    "react/jsx-pascal-case": 1,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 2,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/jsx-wrap-multilines": 1,
    "react/jsx-tag-spacing": 2,
    "react/no-danger": 2,
    "react/no-did-mount-set-state": 1,
    "react/no-did-update-set-state": 1,
    "react/no-direct-mutation-state": 1,
    "react/no-multi-comp": 1,
    "react/no-unknown-property": 1,
    "react/prefer-es6-class": 1,
    "react/prop-types": 2,
    "react/react-in-jsx-scope": 1,
    "react/jsx-filename-extension": 0,
    "react/prefer-stateless-function": 0,
    "import/first": 0,
    "no-useless-escape": 2,
    "import/extensions": [1, {
      "js": "never",
      "jsx": "never",
      "css": "always",
      "ico": "always",
      "json": "always",
      "less": "always"
    }],
    "import/named": 2,
    "import/no-unresolved": 2,
    "import/prefer-default-export": 2,
    "react/self-closing-comp": 1,
    "react/sort-comp": 2,
    "arrow-parens": ["error", "as-needed"],
    "linebreak-style": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "padded-blocks": 0,
    "indent": [
      "error",
      2, {
        "ignoredNodes": [
          "JSX"
        ],
        "SwitchCase": 1,
      } ]
  },
}