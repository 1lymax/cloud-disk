import sizeFormat from "./sizeFormat";

describe('sizeFormat', () => {
	test('Mb', () => {
		expect(sizeFormat(100000000)).toBe('95.4 Mb')
	})

	test('Mb close to min', () => {
		expect(sizeFormat(1024*1024+1)).toBe('1.0 Mb')
	})

	test('Mb close to max', () => {
		expect(sizeFormat(1024*1024*1024)).toBe('1024.0 Mb')
	})

	test('Gb', () => {
		expect(sizeFormat(100000000000)).toBe('93.1 Gb')
	})

	test('Gb close to min', () => {
		expect(sizeFormat(1024*1024*1024+1)).toBe('1.0 Gb')
	})

	test('Kb', () => {
		expect(sizeFormat(100000)).toBe('97.7 Kb')
	})

	test('Kb close to min', () => {
		expect(sizeFormat(1024+1)).toBe('1.0 Kb')
	})

	test('Kb close to max', () => {
		expect(sizeFormat(1024*1024-1)).toBe('1024.0 Kb')
	})

	test('Bytes', () => {
		expect(sizeFormat(950)).toBe('950B')
	})

	test('Bytes close to max', () => {
		expect(sizeFormat(1024-1)).toBe('1023B')
	})

	test('OnlyUnits Mb', () => {
		expect(sizeFormat(100000000, true)).toBe(' Mb')
	})

	test('OnlyUnits Gb', () => {
		expect(sizeFormat(100000000000, true)).toBe(' Gb')
	})

	test('OnlyUnits Kb', () => {
		expect(sizeFormat(100000, true)).toBe(' Kb')
	})

	test('OnlyUnits Bytes', () => {
		expect(sizeFormat(950, true)).toBe(' B')
	})
})