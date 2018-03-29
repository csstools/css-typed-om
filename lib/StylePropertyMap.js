import parseAsValue from './parse-as-value';

export default class StylePropertyMap {
	get(...args) {
		if (args.length < 1) {
			throw new TypeError(`Failed to execute 'get' on 'StylePropertyMapReadOnly': 1 argument required, but only ${args.length} present.`);
		}

		const [ property ] = args;
		const value = this.style[property];

		if (value) {
			return parseAsValue(value);
		}

		return null;
	}

	set(...args) {
		if (args.length < 2) {
			throw new TypeError(`Failed to execute 'set' on 'StylePropertyMap': 2 arguments required, but only ${args.length} present.`);
		}

		const [ property, value ] = args;

		this.style[property] = String(value);
	}

	constructor() {
		throw new TypeError('Illegal constructor');
	}
}
