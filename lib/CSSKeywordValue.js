const _value = new WeakMap();

export default class CSSKeywordValue {
	get value() {
		return _value.get(this);
	}

	set value(newValue) {
		_value.set(this, String(newValue));
	}

	toString() {
		return `${this.value}`;
	}

	constructor(...args) {
		if (args.length < 1) {
			throw new TypeError(`Failed to construct 'CSSKeywordValue': 1 arguments required, but only ${args.length} present.`);
		}

		_value.set(this, String(args[0]));
	}
}

Object.defineProperties(CSSKeywordValue.prototype, {
	value: { enumerable: true }
});
