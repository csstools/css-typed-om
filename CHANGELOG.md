# Changes to CSS Typed Object Model

### 0.4.0 (May 11, 2018)

- Fix add method
- Support multiplication and division by number primatives

### 0.3.0 (April 17, 2018)

- Only polyfill constructors on the window object passed into `polyfill()`
- Support CSS calc, like `add()`, `sub()`, `mul()`, and `div()`
- Support CSS min and max, like `min()` and `max()`

### 0.2.0 (April 4, 2018)

- Safely checks for existing methods before polyfilling
- `CSSUnitValue` and `CSSKeywordValue` have realistic getters and setters

### 0.1.0 (April 2, 2018)

- Default export is now `polyfill`
- Parsing existing CSS values is improved
- Secondary underscore-prefixed values removed from `CSSUnitValue`

### 0.0.0 (March 28, 2018)

- Initial version
