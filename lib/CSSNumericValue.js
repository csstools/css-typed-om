import CSSMathMax from './CSSMathMax'
import CSSMathMin from './CSSMathMin'
import CSSUnitValue from './CSSUnitValue';
import CSSMathProduct from './CSSMathProduct'
import CSSMathInvert from './CSSMathInvert'
import CSSMathSum from './CSSMathSum'

export default class CSSNumericValue {
	add(...args) {
		const Constructor = this.constructor
		const result = new Constructor(this.value, this.unit)
		const values = []

		for (let arg of args) {
			if (arg instanceof Constructor) {
				if (values.length || result.unit !== arg.unit) {
					values.push(arg)
				} else {
					result.value += arg.value
				}
			} else if (
				arg instanceof CSSMathProduct ||
				arg instanceof CSSMathMax ||
				arg instanceof CSSMathMin ||
				arg instanceof CSSMathInvert
			 ) {
				values.push(arg)
			} else {
				return null
			}
		}

		return values.length ? new CSSMathSum(result, ...values) : result
	}

	div(...args) {
		const Constructor = this.constructor
		const result = new Constructor(this.value, this.unit)
		const values = []

		for (let arg of args) {
			if (typeof arg === 'number') {
				arg = new CSSUnitValue(arg, 'number')
			}

			if (arg instanceof Constructor) {
				if (values.length || result.unit !== arg.unit && arg.unit !== 'number') {
					values.push(arg)
				} else {
					result.value /= arg.value
				}
			} else {
				return null
			}
		}

		return values.length ? new CSSMathProduct(result, ...values.map(
			value => new CSSMathInvert(value)
		)) : result
	}

	max(...args) {
		const result = new CSSUnitValue(this.value, this.unit)
		const values = [result]

		for (let arg of args) {
			if (arg instanceof CSSUnitValue) {
				if (values.length > 1 || result.unit !== arg.unit) {
					values.push(arg)
				} else {
					result.value = Math.max(result.value, arg.value)
				}
			} else {
				return null
			}
		}

		return values.length > 1 ? new CSSMathMax(...values) : result
	}

	min(...args) {
		const result = new CSSUnitValue(this.value, this.unit)
		const values = [result]

		for (let arg of args) {
			if (arg instanceof CSSUnitValue) {
				if (values.length > 1 || result.unit !== arg.unit) {
					values.push(arg)
				} else {
					result.value = Math.min(result.value, arg.value)
				}
			} else {
				return null
			}
		}

		return values.length > 1 ? new CSSMathMin(...values) : result
	}

	mul(...args) {
		const Constructor = this.constructor
		const result = new Constructor(this.value, this.unit)
		const values = []

		for (let arg of args) {
			if (typeof arg === 'number') {
				arg = new CSSUnitValue(arg, 'number')
			}

			if (arg instanceof Constructor) {
				if (values.length || result.unit !== arg.unit && arg.unit !== 'number') {
					values.push(arg)
				} else {
					result.value *= arg.value
				}
			} else {
				return null
			}
		}

		return values.length ? new CSSMathProduct(result, ...values) : result
	}

	sub(...args) {
		const Constructor = this.constructor
		const result = new Constructor(this.value, this.unit)
		const values = []

		for (let arg of args) {
			if (arg instanceof Constructor) {
				if (values.length || result.unit !== arg.unit) {
					values.push(new Constructor(arg.value * -1, arg.unit))
				} else {
					result.value -= arg.value
				}
			} else {
				return null
			}
		}

		return values.length ? new CSSMathSum(result, ...values) : result
	}
}
