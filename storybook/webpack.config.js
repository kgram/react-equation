module.exports = async ({ config }) => ({
	...config,
	resolve: {
		...config.resolve,
		extensions: [ '.ts', '.tsx', '.mjs', '.js', '.jsx', '.json' ],
	},
	module: {
		rules: [
			{
				...config.module.rules[0],
				test: /\.(mjs|js|jsx|ts|tsx)$/,
			},
			...config.module.rules.slice(1),
		],
	},
})
