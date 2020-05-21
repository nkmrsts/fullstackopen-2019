module.exports = {
    "env": {
      node: true,
      "jest": true
    },
    extends: ['standard', 'plugin:prettier/recommended'],
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    plugins:['prettier'],
    rules: {
      "prettier/prettier": "error",
      "quotes": ['error', 'single'],
      "semi": ['error', 'never'],
      'no-console': 0
    }
};