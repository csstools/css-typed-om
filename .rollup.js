import babel from 'rollup-plugin-babel';

export default {
	input: 'index.js',
	output: [
		{ file: 'index.umd.js', format: 'umd', name: 'cssTypedOm' },
		{ file: 'index.es.js', format: 'es' }
	],
	plugins: [
		babel({
			plugins: [
				'array-includes'
			],
			presets: [
				['env', { modules: false, targets: { node: 4 } }]
			]
		})
	]
};
