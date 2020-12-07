module.exports = {
	root: true,
	env: {
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
	rules: {
		'no-console': 'warn'
	}
};
