const _values = new WeakMap();

export default class CSSMathMax {
	get operator() {
		return 'max';
	}

	get values() {
		return _values.get(this);
	}

	toString() {
		return `max(${_values.get(this).join(', ')})`
	}

	constructor(...values) {
		_values.set(this, values);
	}
}
