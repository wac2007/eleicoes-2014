module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jest',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': ['error', 'always', {
      ignorePackages: true,
      pattern: {
        ts: 'never',
        tsx: 'never',
      },
    }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    }],
  },
  settings: {
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
