module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  globals: {
    google: 'readonly'
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.json', '.tsx', '.ts', '.jsx']
      }
    }
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    complexity: ['error', { max: 20 }],
    'no-unused-expressions': [0],
    'react/require-default-props': [0],
    'react/jsx-props-no-spreading': [0],
    'no-param-reassign': [0],
    'import/prefer-default-export': [0],
    'react/prop-types': [0],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ],
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true
      }
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    'no-shadow': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'react/react-in-jsx-scope': ['off']
  }
};
