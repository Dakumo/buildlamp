var officeHours = require('../officeHours.js');
var assert = require('assert');

describe('Working time', function() {
	it ('should be between 7am and 7pm', function() {
		assert.ok(officeHours.isItWorkingTime(new Date(2014, 1, 3, 8)));
		assert.ok(officeHours.isItWorkingTime(new Date(2014, 1, 3, 16)));
		assert.ok(officeHours.isItWorkingTime(new Date(2014, 1, 3, 18, 55)));
		assert.ok(officeHours.isItWorkingTime(new Date(2014, 1, 5, 14, 15)));
		assert.ok(officeHours.isItWorkingTime(new Date(2014, 1, 6, 7, 1)));
		assert.ok(officeHours.isItWorkingTime(new Date(2014, 1, 6, 18, 55)));
	});

	it ('should not be on weekends', function() {
		assert.equal(false, officeHours.isItWorkingTime(new Date(2014, 1, 1)));
		assert.equal(false, officeHours.isItWorkingTime(new Date(2014, 1, 2)));
	});

	it ('should not be after 7pm or before 7am', function() {
		assert.equal(false, officeHours.isItWorkingTime(new Date(2014, 1, 3, 19, 15)));
		assert.equal(false, officeHours.isItWorkingTime(new Date(2014, 1, 3, 6)));
	});
});