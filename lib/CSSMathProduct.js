import CSSMathInvert from './CSSMathInvert'

const _values = new WeakMap();

export default class CSSMathProduct {
	get operator() {
		return 'product';
	}

	get values() {
		return _values.get(this);
	}

	toString() {
		return `calc(${_values.get(this).reduce(
			(contents, value) => `${value instanceof CSSMathInvert
				? `${contents
						? `${contents} / `
					: '1 / '
				}${value.value}`
			: `${contents
					? `${contents} * `
				: ''}${value}`
			}`,
			''
		)})`
	}

	constructor(...values) {
		_values.set(this, values);
	}
}
