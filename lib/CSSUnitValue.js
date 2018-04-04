import units from './units';

const _value = new WeakMap();
const _unit = new WeakMap();

export default class CSSUnitValue {
	get value() {
		return _value.get(this);
	}

	set value(newValue) {
		_value.set(this, getFiniteNumber(newValue));
	}

	get unit() {
		return _unit.get(this);
	}

	toString() {
		return `${this.value}${units[this.unit]}`;
	}

	constructor(...args) {
		if (args.length < 2) {
			throw new TypeError(`Failed to construct 'CSSUnitValue': 2 arguments required, but only ${args.length} present.`);
		}

		_value.set(this, getFiniteNumber(args[0]));
		_unit.set(this, getUnit(args[1]));
	}
}

Object.defineProperties(CSSUnitValue.prototype, {
	value: { enumerable: true },
	unit: { enumerable: true }
});

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
