module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'airbnb',
		'airbnb/hooks',
		'airbnb-typescript',
		'prettier',
		'plugin:prettier/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	ignorePatterns: ['.eslintrc.js'],
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn',
		'react/no-unused-prop-types': 'warn',
		'import/prefer-default-export': 'off',
		"no-param-reassign": [
			"error",
			{
				"props": true,
				"ignorePropertyModificationsFor": [
					"state",
					"acc"
				]
			}
		],
	},
};
