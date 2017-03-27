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
var LIGHT_ID_TEAM_3 = 9;

/// congo
var jenkinsHueCongstarTeam3 = new JenkinsHue({
    jenkins: {
        // API Token authentication, password in PWD
        host: 'http://congo.monitoring:cb92f646386df9ef24f4ee1d3918d1b2@congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/Congo%20Monitoring/view/Team%203/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHueCongstarTeam7 = new JenkinsHue({
    jenkins: {
        host: 'http://congo.monitoring:cb92f646386df9ef24f4ee1d3918d1b2@congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/Congo%20Monitoring/view/Team%207/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHueCongstarTeam10 = new JenkinsHue({
    jenkins: {
        host: 'http://congo.monitoring:cb92f646386df9ef24f4ee1d3918d1b2@congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/Congo%20Monitoring/view/Team%2010/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHueCongstarTeam12 = new JenkinsHue({
    jenkins: {
        host: 'http://congo.monitoring:cb92f646386df9ef24f4ee1d3918d1b2@congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/Congo%20Monitoring/view/Team%2012/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHuePipeline = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar-congo.itg.de2.dc.aoe.lan:8080/view/Congo%20Monitoring/view/Pipeline/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

//////

var jenkinsHueCobraAw = new JenkinsHue({
    jenkins: {
        host: 'http://congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/Cobra/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueApp = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@congstar-jenkins.itg.de2.dc.aoe.lan:8080/view/App/view/Monitoring%20(Lampe)/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});



function updateLights() {
    jenkinsHueCongstarTeam10.setLightForJenkinsView(LIGHT_ID_TABLE_ALEX);
    jenkinsHueCongstarTeam7.setLightForJenkinsView(LIGHT_ID_TABLE_BILAL);
    jenkinsHueCongstarTeam7.setLightForJenkinsView(LIGHT_ID_TABLE_FLORIAN);
    jenkinsHueCongstarTeam12.setLightForJenkinsView(LIGHT_ID_TABLE_TORSTEN);
    jenkinsHueCongstarTeam3.setLightForJenkinsView(LIGHT_ID_TEAM_3);
    jenkinsHueCobraAw.setLightForJenkinsView(LIGHT_ID_TABLE_STEFAN);
    jenkinsHueApp.setLightForJenkinsView(LIGHT_ID_TABLE_SILAS);
    jenkinsHuePipeline.setLightForJenkinsView(LIGHT_ID_PIPELINE);
}

function switchLightsOn() {
    updateLights();
    switchedOn = true;
}

function switchLightsOff() {
    jenkinsHueCongstarTeam10.hue.switchOff(LIGHT_ID_TABLE_ALEX);
    jenkinsHueCongstarTeam7.hue.switchOff(LIGHT_ID_TABLE_BILAL);
    jenkinsHueCongstarTeam7.hue.switchOff(LIGHT_ID_TABLE_FLORIAN);
    jenkinsHueCongstarTeam12.hue.switchOff(LIGHT_ID_TABLE_TORSTEN);
    jenkinsHueCongstarTeam3.hue.switchOff(LIGHT_ID_TEAM_3);
    jenkinsHueCobraAw.hue.switchOff(LIGHT_ID_TABLE_STEFAN);
    jenkinsHueApp.hue.switchOff(LIGHT_ID_TABLE_SILAS);
    jenkinsHuePipeline.hue.switchOff(LIGHT_ID_PIPELINE);
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
