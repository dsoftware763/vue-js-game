module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'semi': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-mixed-spaces-and-tabs': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
