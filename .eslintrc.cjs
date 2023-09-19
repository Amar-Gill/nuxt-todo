module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    // Global
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      }
    ],
  },
};
