var server = require('../server.js');
var officeHours = require('../officeHours');
var assert = require('assert');
var sinon = require('sinon');

describe('AOE Build Lights', function() {
	beforeEach(function() {
		sinon.stub(officeHours, 'isItWorkingTime');
	});

	afterEach(function() {
		officeHours.isItWorkingTime.restore();
	});

	it('should be switched on during working time', function() {
		officeHours.isItWorkingTime.returns(true);
		server.controlLightsInOffice();
		assert.equal(true, server.isSwitchedOn());
	});

	it('should be switched off if outside working time', function() {
		officeHours.isItWorkingTime.returns(false);
		server.controlLightsInOffice();
		assert.equal(false, server.isSwitchedOn());
	});

	it('should be switched on again after being switched off', function() {
		officeHours.isItWorkingTime.returns(false);
		server.controlLightsInOffice();
		assert.equal(false, server.isSwitchedOn());
		officeHours.isItWorkingTime.returns(true);
		server.controlLightsInOffice();
		assert.equal(true, server.isSwitchedOn());
	});
});