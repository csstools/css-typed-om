import units from './units';
import CSSUnitValue from './CSSUnitValue';
import CSSKeywordValue from './CSSKeywordValue';

export default string => {
	const unitParsingMatch = String(string).match(unitParsingMatcher);

	if (unitParsingMatch) {
		const [, value, unit] = unitParsingMatch;

		return new CSSUnitValue(value, unitKeys[unitValues.indexOf(unit)]);
	}

	return new CSSKeywordValue(string);
}

const unitKeys = Object.keys(units);
const unitValues = Object.values(units);
const unitParsingMatcher = new RegExp(`^([-+]?[0-9]*\.?[0-9]+)(${unitValues.join('|')})?$`);
