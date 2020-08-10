const dummy = require('../utils/list_helper').dummy


describe('dummy', () => {
	test('of an array always returns 1', () => {
		expect(dummy([23,2])).toBe(1)})

	test('of an empty array is 1', () => {
		expect(dummy([])).toBe(1)})
})