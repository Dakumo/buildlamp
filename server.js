'use strict';

var JenkinsHue = require('jenkins-hue');
var officeHours = require('./officeHours');
var moment = require('moment');
var INTERVAL = 15 * 1000;
var switchedOn = true;

var LIGHT_ID_TABLE_ALEX = 1;
var LIGHT_ID_TABLE_BILAL = 2;
var LIGHT_ID_TABLE_FLORIAN = 3;
var LIGHT_ID_TABLE_STEFAN = 6;
var LIGHT_ID_TABLE_SILAS = 5;
var LIGHT_ID_TABLE_TORSTEN = 7;
var LIGHT_ID_PIPELINE = 8;

var jenkinsHueCongstar = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar-congo.itg.de2.dc.aoe.lan:8080/view/Congo/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueColumbus = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar-congo.itg.de2.dc.aoe.lan:8080/view/Cobra/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueCobraAw = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/Cobra%20(Active%20Wholebuy)/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
})

var jenkinsHueApp = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/App/view/Monitoring%20(Lampe)/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
})

var jenkinsHueAppPipeline = new JenkinsHue({
    jenkins: {
        host: 'http://congstar-congo.itg.de2.dc.aoe.lan:8080/view/Congo%20Monitoring/view/Pipeline/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
})

function updateLights() {
    jenkinsHueCongstar.setLightForJenkinsView(LIGHT_ID_TABLE_ALEX);
    jenkinsHueCongstar.setLightForJenkinsView(LIGHT_ID_TABLE_BILAL);
    jenkinsHueCongstar.setLightForJenkinsView(LIGHT_ID_TABLE_FLORIAN);
    jenkinsHueCongstar.setLightForJenkinsView(LIGHT_ID_TABLE_TORSTEN);
    jenkinsHueCobraAw.setLightForJenkinsView(LIGHT_ID_TABLE_STEFAN);
    jenkinsHueApp.setLightForJenkinsView(LIGHT_ID_TABLE_SILAS);
    jenkinsHueAppPipeline.setLightForJenkinsView(LIGHT_ID_PIPELINE);
}

function switchLightsOn() {
    updateLights();
    switchedOn = true;
}

function switchLightsOff() {
    jenkinsHueCongstar.hue.switchOff(1);
    jenkinsHueCongstar.hue.switchOff(2);
    jenkinsHueCongstar.hue.switchOff(3);
    jenkinsHueCongstar.hue.switchOff(6);
    jenkinsHueCongstar.hue.switchOff(5);
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
