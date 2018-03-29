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
import { polyfill } from 'css-typed-om';

polyfill(window);
```

Use [CSS Typed Object Model] features:

```js
// Element styles
document.body.attributeStyleMap.set('padding-top', CSS.px(42));
document.body.attributeStyleMap.get('padding-top') // CSSUnitValue { value: 42, unit: 'px' }

document.body.attributeStyleMap.set('opacity', 0.3);
typeof document.body.attributeStyleMap.get('opacity').value // number
document.body.attributeStyleMap.get('opacity').unit // "number"

// Stylesheet rules
document.styleSheets[0].cssRules[0].styleMap.set('padding-top', '100px');
document.styleSheets[0].cssRules[0].styleMap.get('padding-top'); // CSSUnitValue { value: 100, unit: 'px' }
```

## Features

### polyfill

The `polyfill` function adds the following functions to `window` if they do not
already exist:

- `CSS`
- `CSSStyleValue`
- `CSSKeywordValue`
- `CSSUnitValue`
- `StylePropertyMap`

It also adds the following functions to `window.CSS` if they do not already
exist:

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

### StylePropertyMap

A constructor for `StylePropertyMap`, used to polyfill 

### CSSKeywordValue

A constructor for `CSSKeywordValue`, used by `StylePropertyMap`.

### CSSUnitValue

A constructor for `CSSUnitValue`, used by `StylePropertyMap`.

### CSSStyleValue

A constructor for `CSSStyleValue`, the super constructor of `CSSKeywordValue`
and `CSSUnitValue`.

[npm-url]: https://www.npmjs.com/package/css-typed-om
[npm-img]: https://img.shields.io/npm/v/css-typed-om.svg
[cli-url]: https://travis-ci.org/jonathantneal/css-typed-om
[cli-img]: https://img.shields.io/travis/jonathantneal/css-typed-om.svg

[CSS Typed Object Model]: https://github.com/jonathantneal/css-typed-om
[CSS Typed OM Level 1]: https://drafts.css-houdini.org/css-typed-om-1/
