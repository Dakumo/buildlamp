'use strict';

var JenkinsHue = require('jenkins-hue');
var officeHours = require('./officeHours');
var moment = require('moment');
var INTERVAL = 15 * 1000;
var switchedOn = true;

var LIGHT_ID_TABLE_ALEX = 1;
var LIGHT_ID_TABLE_BILAL = 2;
var LIGHT_ID_TABLE_FLORIAN = 3;

var jenkinsHueCongstar = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar.itg.de2.dc.aoe.lan:8080/view/Congo/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueColumbus = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar.itg.de2.dc.aoe.lan:8080/view/Cobra/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

function updateLights() {
    jenkinsHueColumbus.setLightForJenkinsView(LIGHT_ID_TABLE_ALEX);
    jenkinsHueCongstar.setLightForJenkinsView(LIGHT_ID_TABLE_BILAL);
    jenkinsHueCongstar.setLightForJenkinsView(LIGHT_ID_TABLE_FLORIAN);
}

function switchLightsOn() {
    updateLights();
    switchedOn = true;
}

function switchLightsOff() {
    jenkinsHueCongstar.hue.switchOff(1);
    jenkinsHueCongstar.hue.switchOff(2);
    jenkinsHueCongstar.hue.switchOff(3);
    switchedOn = false;
}

function controlLightsInOffice(){
    if (officeHours.isItWorkingTime()) {
        if (switchedOn === true) {
            updateLights();            
            console.log(moment().format(), "LIGHTS UPDATED");
        } else {
            switchLightsOn();
            console.log(moment().format(), "LIGHTS SWITCHED ON");
        }
    } else {
        if (switchedOn === true) {
            switchLightsOff();
            console.log(moment().format(), "LIGHTS SWITCHED OFF");
        }
    }
}

controlLightsInOffice();
setInterval(controlLightsInOffice, INTERVAL);

module.exports = {
    isSwitchedOn: function() {
        return switchedOn;
    },
    controlLightsInOffice: controlLightsInOffice
};