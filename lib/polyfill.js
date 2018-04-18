import CSSKeywordValue from './CSSKeywordValue';
import CSSMathInvert from './CSSMathInvert';
import CSSMathMax from './CSSMathMax';
import CSSMathMin from './CSSMathMin';
import CSSMathProduct from './CSSMathProduct';
import CSSMathSum from './CSSMathSum';
import CSSStyleValue from './CSSStyleValue';
import CSSUnitValue from './CSSUnitValue';
import StylePropertyMap from './StylePropertyMap';
import units from './units';

export default function polyfill(window) {
	if (!window.CSS) window.CSS = class CSS {}

	Object.keys(units).forEach(
		unit => {
			if (!(unit in window.CSS)) {
				window.CSS[unit] = value => new CSSUnitValue(value, unit);
			}
		}
	);

	defineProperty(
		window.CSSRule.prototype,
		'styleMap',
		context => context.style
	);

	defineProperty(
		window.Element.prototype,
		'attributeStyleMap',
		context => context.style
	);

	defineProperty(
		window.Element.prototype,
		'computedStyleMap',
		context => getComputedStyle(context)
	);

	if (!window.CSSKeywordValue) window.CSSKeywordValue = CSSKeywordValue;
	if (!window.CSSMathInvert) window.CSSMathInvert = CSSMathInvert;
	if (!window.CSSMathMax) window.CSSMathMax = CSSMathMax;
	if (!window.CSSMathMin) window.CSSMathMin = CSSMathMin;
	if (!window.CSSMathProduct) window.CSSMathProduct = CSSMathProduct;
	if (!window.CSSMathSum) window.CSSMathSum = CSSMathSum;
	if (!window.CSSStyleValue) window.CSSStyleValue = CSSStyleValue;
	if (!window.CSSUnitValue) window.CSSUnitValue = CSSUnitValue;
	if (!window.StylePropertyMap) window.StylePropertyMap = StylePropertyMap;

	function defineProperty(prototype, property, getStyle) {
		if (!(property in prototype)) {
			Object.defineProperty(prototype, property, {
				configurable: true,
				enumerable: true,
				get() {
					const computedStyleMap = Object.create(StylePropertyMap.prototype);

					computedStyleMap.style = getStyle(this);

					return computedStyleMap;
				}
			});
		}
	}
}
