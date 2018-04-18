const _value = new WeakMap();

export default class CSSMathInvert {
	get operator() {
		return 'invert';
	}

	get value() {
		return _value.get(this);
	}

	toString() {
		return `calc(1 / ${_value.get(this)})`
	}

	constructor(value) {
		_value.set(this, value)
	}
}
