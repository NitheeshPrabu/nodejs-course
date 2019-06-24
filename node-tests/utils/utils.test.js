const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {
	it('should add two numbers', () => { // behaviour-driven development
		var res = utils.add(33, 11);
	
		expect(res).toBe(44).toBeA('number');
		// if (res != 44) {
		// 	throw new Error(`Expected 44, but got ${res}.`);
		// }
	});	
	
	it('should async add two numbers', (done) => {
		utils.addAsync(4, 3, (sum) => {
			expect(sum).toBe(7).toBeA('number');
	
			// need to add done() to indicate async test
			// and has a callback
			done();
		});
	});
});