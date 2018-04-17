const _values = new WeakMap();

export default class CSSMathSum {
	get operator() {
		return 'product';
	}

	get values() {
		return _values.get(this);
	}

	toString() {
		return `calc(${_values.get(this).reduce(
			(contents, value) => `${contents ? `${contents} + ` : ''}${value}`,
			''
		)})`
	}

	constructor(...values) {
		_values.set(this, values);
	}
}
