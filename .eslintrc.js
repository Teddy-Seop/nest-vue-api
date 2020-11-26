module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': ['warn', 'always-multiline'],
    'space-before-function-paren': 'off',
    'no-use-before-define': 'off',
    'max-len': ['warn', 120],
    'no-trailing-spaces': 'error',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: ['variableLike', 'typeParameter'],
        format: ['camelCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
        leadingUnderscore: 'allow',
      },
    ],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'angle-bracket' },
    ],
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    '@typescript-eslint/no-unused-vars': ['off'],
    '@typescript-eslint/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false },
    ],
    '@typescript-eslint/no-inferrable-types': ['off'],
    'jest/no-test-callback': ['off'],
  },
};
