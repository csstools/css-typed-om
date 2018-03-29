import { CSSKeywordValue, CSSUnitValue, CSSStyleValue, StylePropertyMap } from 'css-typed-om';
import units from './units';

export default function polyfill(window) {
	if (!window.CSS) window.CSS = class CSS {}

	Object.keys(units).forEach(
		unit => {
			if (!window.CSS[unit]) {
				window.CSS[unit] = value => new CSSUnitValue(value, unit);
			}
		}
	);

	if (!CSSRule.prototype.styleMap) defineProperty(
		CSSRule.prototype,
		'styleMap',
		context => context.style
	);

	if (!CSSRule.prototype.attributeStyleMap) defineProperty(
		Element.prototype,
		'attributeStyleMap',
		context => context.style
	);

	if (!Element.prototype.computedStyleMap) defineProperty(
		Element.prototype,
		'computedStyleMap',
		context => getComputedStyle(context)
	);

	if (!window.CSSKeywordValue) window.CSSKeywordValue = CSSKeywordValue;
	if (!window.CSSUnitValue) window.CSSUnitValue = CSSUnitValue;
	if (!window.CSSStyleValue) window.CSSStyleValue = CSSStyleValue;
	if (!window.StylePropertyMap) window.StylePropertyMap = StylePropertyMap;

	function defineProperty(prototype, property, getStyle) {
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
