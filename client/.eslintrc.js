module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'warn',
    'react/jsx-no-bind': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'import/no-relative-packages': 'off',
    'linebreak-style': 'off',
  },
};
