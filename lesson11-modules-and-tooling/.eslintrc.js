module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier', // Disables ESLint rules that conflict with Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    // Error Prevention
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-console': 'warn',

    // Best Practices
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always'],
    'no-implicit-globals': 'error',
    'no-new-wrappers': 'error',

    // Import/Export
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        'newlines-between': 'always',
      },
    ],

    // Code Style (let Prettier handle most formatting)
    'max-len': ['warn', { code: 100, ignoreUrls: true }],
    complexity: ['warn', 10],
    'max-depth': ['warn', 4],
    'max-params': ['warn', 4],

    // Modern JavaScript
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off', // Allow console in tests
      },
    },
  ],
};