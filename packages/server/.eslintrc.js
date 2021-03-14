export default {
  "root": true,
  "extends": [
    "plugin:prettier/recommended",
  ],
  "plugins": ["import"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": [
      "warn",
      {
        "args": "after-used",
        "ignoreRestSiblings": false,
        "argsIgnorePattern": "^_$"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100,
        "trailingComma": "all",
        "tabWidth": 2,
        "semi": false,
        "singleQuote": false,
        "bracketSpacing": false,
        "arrowParens": "always"
      }
    ],
    "import/order": ["warn", {"newlines-between": "always"}],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
      {
        "blankLine": "always",
        "prev": [
          "const",
          "let",
          "var"
        ],
        "next": "*"
      },
      {
        "blankLine": "any",
        "prev": [
          "const",
          "let",
          "var"
        ],
        "next": [
          "const",
          "let",
          "var"
        ]
      }
    ]
  }
}
