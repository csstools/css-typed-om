import CSSStyleValue from './CSSStyleValue';
import units from './units';

export default class CSSUnitValue extends CSSStyleValue {
	get value() {
		return this._value;
	}

	set value(value) {
		this._value = getFiniteNumber(value)
	}

	get unit() {
		return this._unit;
	}

	toString() {
		return this._unit === 'number' ? `${this._value}` : `${this._value}${units[this._unit]}`;
	}

	constructor(...args) {
		super()

		if (args.length < 2) {
			throw new TypeError(`Failed to construct 'CSSUnitValue': 2 arguments required, but only ${args.length} present.`);
		}

		this._value = getFiniteNumber(args[0]);
		this._unit = getUnit(args[1]);
	}
}

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
