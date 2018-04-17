const _values = new WeakMap();

export default class CSSMathMin {
	get operator() {
		return 'min';
	}

	get values() {
		return _values.get(this);
	}

	toString() {
		return `min(${_values.get(this).join(', ')})`
	}

	constructor(...values) {
		_values.set(this, values);
	}
}
