module.exports = {
    root: true,
    parser: 'typescript-eslint-parser',

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },

    extends: 'eslint:recommended',
    plugins: [
        'react',
    ],
    env: {
        browser: true,
    },
    rules: {
        'indent': ['error', 4, { SwitchCase: 1 }],
        'quotes': ['error', 'single', { "allowTemplateLiterals": true }],
        'semi': ['error', 'never'],

        // handled by ts
        'no-unused-vars': 'off',
        'no-undef': 'off',

        // does not work with ts-parser because of comments
        'no-empty': 'off',
    }
}