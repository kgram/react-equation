module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    env: {
        browser: true,
    },
    rules: {
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'semi': ['error', 'never'],
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'always-multiline',
        }],

        '@typescript-eslint/member-delimiter-style': ['error', {
            'multiline': {
                'delimiter': 'comma',
                'requireLast': true,
            },
            'singleline': {
                'delimiter': 'comma',
                'requireLast': false,
            },
            'overrides': {
                'interface': {
                    'multiline': {
                        'delimiter': 'none',
                        'requireLast': false,
                    },
                    'singleline': {
                        'delimiter': 'semi',
                        'requireLast': false,
                    },
                },
            },
        }],
        // Allow using rest destructuring to omit variables without complaint
        '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true }],

        'no-undef': 'off',

        // does not work with ts-parser because of comments
        'no-empty': 'off',

        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-misused-new': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/generic-type-naming': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        // Is triggered by <T extends any>, which is necessary for generics in .tsx files
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        // This just causes noise, the problems highlighted aren't actually problems
        '@typescript-eslint/ban-types': 'off',
    },
}
