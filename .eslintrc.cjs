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
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
};
