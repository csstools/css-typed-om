import CSSStyleValue from './CSSStyleValue';

export default class CSSKeywordValue extends CSSStyleValue {
	get value() {
		return this._value;
	}

	set value(value) {
		this._value = String(value)
	}

	toString() {
		return `${this._value}`;
	}

	constructor(...args) {
		super()

		if (args.length < 1) {
			throw new TypeError(`Failed to construct 'CSSKeywordValue': 1 arguments required, but only ${args.length} present.`);
		}

		this._value = String(args[0]);
	}
}
