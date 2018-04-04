import CSSKeywordValue from './CSSKeywordValue';
import CSSUnitValue from './CSSUnitValue';
import CSSStyleValue from './CSSStyleValue';
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
		CSSRule.prototype,
		'styleMap',
		context => context.style
	);

	defineProperty(
		Element.prototype,
		'attributeStyleMap',
		context => context.style
	);

	defineProperty(
		Element.prototype,
		'computedStyleMap',
		context => getComputedStyle(context)
	);

	if (!window.CSSKeywordValue) window.CSSKeywordValue = CSSKeywordValue;
	if (!window.CSSUnitValue) window.CSSUnitValue = CSSUnitValue;
	if (!window.CSSStyleValue) window.CSSStyleValue = CSSStyleValue;
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
