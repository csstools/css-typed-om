import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import npm from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
	input: 'browser.js',
	output: [
		{ file: 'browser.iife.js', format: 'iife', name: 'cssTypedOm', sourcemap: true }
	],
	plugins: [
		npm(),
		commonjs({
			include: [
				'node_modules/**',
				'../**'
			]
		}),
		babel({
			plugins: [
				'array-includes'
			],
			presets: [
				['env', { modules: false, targets: { node: 4 } }]
			]
		}),
		uglify({
			mangle: {
				keep_classnames: true,
				keep_fnames: true
			}
		})
	]
};
