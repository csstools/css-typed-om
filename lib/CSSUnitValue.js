import CSSStyleValue from './CSSStyleValue';
import units from './units';

export default class CSSUnitValue {
	constructor(...args) {
		if (args.length < 2) {
			throw new TypeError(`Failed to construct 'CSSUnitValue': 2 arguments required, but only ${args.length} present.`);
		}

		let [ value, unit ] = args;

		value = getFiniteNumber(value);
		unit = getUnit(unit);

		Object.defineProperties(this, {
			value: {
				configurable: true,
				enumerable: true,
				get() {
					return value
				},
				set(newValue) {
					value = getFiniteNumber(newValue);
				}
			},
			unit: {
				configurable: true,
				enumerable: true,
				get() {
					return unit
				}
			},
			toString: {
				configurable: true,
				enumerable: false,
				value() {
					return this.unit === 'number' ? `${this.value}` : `${this.value}${units[this.unit]}`;
				}
			}
		});
	}
}

CSSUnitValue.prototype = Object.create(CSSStyleValue.prototype);

function getFiniteNumber(value) {
	if (isNaN(value) || Math.abs(value) === Infinity) {
		throw new TypeError(`Failed to set the 'value' property on 'CSSUnitValue': The provided double value is non-finite.`);
	}

	return Number(value);
}

function getUnit(unit) {
	if (!Object.keys(units).includes(unit)) {
		throw new TypeError(`Failed to construct 'CSSUnitValue': Invalid unit: ${unit}`);
	}

	return unit
}
