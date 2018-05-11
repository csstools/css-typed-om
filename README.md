# CSS Typed Object Model [<img src="http://jonathantneal.github.io/js-logo.svg" alt="js logo" width="90" height="90" align="right">][CSS Typed Object Model]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]

[CSS Typed Object Model] is a work-in-progress polyfill for using
[CSS Typed OM Level 1] in the browser.

**Pull Requests are welcome. Please don’t use this in production until there is
a v1.0.0.**

```bash
npm install css-typed-om
```

Polyfill the `window` object:

```js
import polyfill from 'css-typed-om';

polyfill(window);
```

Use [CSS Typed Object Model] features:

```js
// Element styles
document.body.attributeStyleMap.set('padding-top', CSS.px(42));
document.body.attributeStyleMap.get('padding-top') /* CSSUnitValue {
  value: 42,
  unit: 'px'
}.toString() => 42px */

document.body.attributeStyleMap.set('opacity', 0.3);
typeof document.body.attributeStyleMap.get('opacity').value // number
document.body.attributeStyleMap.get('opacity').unit // "number"

// Stylesheet rules
document.styleSheets[0].cssRules[0].styleMap.set('padding-top', '100px');
document.styleSheets[0].cssRules[0].styleMap.get('padding-top'); /* CSSUnitValue {
  value: 100,
  unit: 'px'
}.toString() => 100px */

// Math products
CSS.px(15).add(CSS.rem(10), CSS.em(5)) /* CSSMathSum {
  operator: "sum",
  values: [
    CSSUnitValue { value: 15, unit: 'px' },
    CSSUnitValue { value: 10, unit: 'rem' },
    CSSUnitValu { value: 5, unit: 'em' }
  ]
}.toString() => calc(15px + 10rem + 5em) */

CSS.px(15).mul(CSS.rem(10), CSS.em(5)) /* CSSMathProduct {
  operator: "product",
  values: [
    CSSUnitValue { value: 15, unit: 'px' },
    CSSUnitValue { value: 10, unit: 'rem' },
    CSSUnitValu { value: 5, unit: 'em' }
  ]
}.toString() => calc(15px * 10rem * 5em) */

CSS.px(15).sub(CSS.rem(10), CSS.em(5)) /* CSSMathSum {
  operator: "sum",
  values: [
    CSSUnitValue { value: 15, unit: 'px' },
    CSSUnitValue { value: -10, unit: 'rem' },
    CSSUnitValu { value: -5, unit: 'em' }
  ]
}.toString() => calc(15px + -10rem + -5em) */

CSS.px(15).div(CSS.rem(10), CSS.em(5)) /* CSSMathProduct {
  operator: "product",
  values: [
    CSSUnitValue { value: 15, unit: 'px' },
    CSSMathInvert {
      operator: 'invert',
      value: CSSUnitValue { value: 10, unit: 'rem' }
    },
    CSSMathInvert {
      operator: 'invert',
      value: CSSUnitValue { value: 5, unit: 'em' }
    }
  ]
}.toString() => calc(15px / 10rem / 5em) */

CSS.px(15).max(CSS.rem(10), CSS.em(5)) /* CSSMathMax {
  operator: 'max',
  values: [
    CSSUnitValue { value: 15, unit: 'px' },
    CSSUnitValue { value: 10, unit: 'rem' },
    CSSUnitValu { value: 5, unit: 'em' }
  ],
}.toString() => max(15px, 10rem, 5em) */

CSS.px(15).min(CSS.rem(10), CSS.em(5)) /* CSSMathMin {
  operator: 'min',
  values: [
    CSSUnitValue { value: 15, unit: 'px' },
    CSSUnitValue { value: 10, unit: 'rem' },
    CSSUnitValu { value: 5, unit: 'em' }
  ],
}.toString() => min(15px, 10rem, 5em) */
```

## Features

### polyfill

The `polyfill` function adds the following functions to `window` if they do not
already exist:

- `CSS`
- `CSSKeywordValue`
- `CSSMathInvert`
- `CSSMathMax`
- `CSSMathMin`
- `CSSMathProduct`
- `CSSMathSum`
- `CSSStyleValue`
- `CSSUnitValue`
- `StylePropertyMap`

It then adds the following functions to `CSS` if they do not already exist:

- `number`
- `percent`
- `em`
- `ex`
- `ch`
- `rem`
- `vw`
- `vh`
- `vmin`
- `vmax`
- `cm`
- `mm`
- `in`
- `pt`
- `pc`
- `px`
- `Q`
- `deg`
- `grad`
- `rad`
- `turn`
- `s`
- `ms`
- `Hz`
- `kHz`
- `dpi`
- `dpcm`
- `dppx`
- `fr`

The new `CSSUnitValue` instances returned by these methods extend
`CSSNumericValue`, which allow them to use the following methods:

- `add`
- `div`
- `max`
- `min`
- `mul`
- `sub`

The result of these transforms may be a new `CSSUnitValue` instance or a new
`CSSMathProduct`, `CSSMathMax`, `CSSMathMin`, or `CSSMathSum` instance.

They all stringify back into compliant CSS.

[npm-url]: https://www.npmjs.com/package/css-typed-om
[npm-img]: https://img.shields.io/npm/v/css-typed-om.svg
[cli-url]: https://travis-ci.org/csstools/css-typed-om
[cli-img]: https://img.shields.io/travis/csstools/css-typed-om.svg

[CSS Typed Object Model]: https://github.com/csstools/css-typed-om
[CSS Typed OM Level 1]: https://drafts.css-houdini.org/css-typed-om-1/
