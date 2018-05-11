const polyfill = require('.').default
const CSS = {}
const window = { CSS, CSSRule: { prototype: {} }, Element: { prototype: {} } };

polyfill(window)

const units = {
	ch: 'ch',
	rem: 'rem',
	vw: 'vw',
	vh: 'vh',
	vmin: 'vmin',
	vmax: 'vmax',
	cm: 'cm',
	mm: 'mm',
	in: 'in',
	pt: 'pt',
	pc: 'pc',
	px: 'px',
	Q: 'Q',
	deg: 'deg',
	grad: 'grad',
	rad: 'rad',
	turn: 'turn',
	s: 's',
	ms: 'ms',
	Hz: 'Hz',
	kHz: 'kHz',
	dpi: 'dpi',
	dpcm: 'dpcm',
	dppx: 'dppx',
	fr: 'fr'
}

const code = Object.keys(units).every(unit => [
	compare(
		CSS[unit](10),
		`10${unit}`
	),
	compare(
		CSS[unit](10).add(CSS[unit](5), CSS[unit](5)),
		`20${unit}`
	),
	compare(
		CSS[unit](10).sub(CSS[unit](2), CSS[unit](3)),
		`5${unit}`
	),
	compare(
		CSS[unit](10).sub(CSS[unit](2), CSS[unit](3)),
		`5${unit}`
	),
	compare(
		CSS[unit](10).mul(2, 3),
		`60${unit}`
	),
	compare(
		CSS[unit](10).div(2, 5),
		`1${unit}`
	)
].every(result => Boolean(result))) && compare(
	CSS.px(15).add(CSS.rem(10), CSS.em(5)),
	'calc(15px + 10rem + 5em)'
) ? 0 : 1;

console.log(code ? 'Fail...' : 'Pass!')

process.exit(code);

function compare(a, b) {
	if (String(a) === String(b)) {
		return true;
	} else {
		return false;
	}
}
