module.exports = {
  env: {
    es2021: true,
    browser: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    'jest',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
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
