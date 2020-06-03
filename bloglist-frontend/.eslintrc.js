module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
    'cypress/globals': true
  },
  extends: ['eslint:recommended', 'react-app', 'plugin:cypress/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-hooks', 'prettier', 'cypress'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'error',
  },
}
