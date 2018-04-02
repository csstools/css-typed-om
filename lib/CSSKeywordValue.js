import CSSStyleValue from './CSSStyleValue';

export default class CSSKeywordValue {
	toString() {
		return `${this.value}`;
	}

	constructor(...args) {
		if (args.length < 1) {
			throw new TypeError(`Failed to construct 'CSSKeywordValue': 1 arguments required, but only ${args.length} present.`);
		}

		let [ value ] = args;

		this.value = String(value);

		Object.defineProperties(this, {
			value: {
				configurable: true,
				enumerable: true,
				get() {
					return value
				},
				set(newValue) {
					value = String(newValue);
				}
			}
		});
	}
}

CSSKeywordValue.prototype = Object.create(CSSStyleValue.prototype);
