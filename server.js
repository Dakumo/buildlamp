'use strict';

var JenkinsHue = require('jenkins-hue');
var officeHours = require('./officeHours');
var moment = require('moment');
var INTERVAL = 15 * 1000;
var switchedOn = true;

var LIGHT_ID_TABLE_ALEX = 1;
var LIGHT_ID_TABLE_BILAL = 2;
var LIGHT_ID_TABLE_FLORIAN = 3;
var LIGHT_ID_TABLE_COBR_AW_1 = 6;
var LIGHT_ID_TABLE_COBR_AW_2 = 10;
var LIGHT_ID_TABLE_SILAS = 5;
var LIGHT_ID_TABLE_TORSTEN = 7;

var LIGHT_ID_PIPELINE = 8;
var LIGHT_ID_TEAM_3 = 9;

var LIGHT_ID_TYPO3_UPGRADE = 12;

/// congo
var jenkinsHueCongstarTeam3 = new JenkinsHue({
    jenkins: {
        // API Token authentication, password in PWD
        host: 'http://congostar-congo-ci.proxy/view/Congo%20Monitoring/view/Team%203/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHueCongstarTeam7 = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/Congo%20Monitoring/view/Team%207/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHueCongstarTeam10 = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/Congo%20Monitoring/view/Team%2010/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHueCongstarTeam12 = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/Congo%20Monitoring/view/Team%2012/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});
var jenkinsHuePipeline = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/Congo%20Monitoring/view/Pipeline/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueCongstarTeamTYPO3Upgrade = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/Congo%20Monitoring/view/Team%20Upgrade/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

//////
var jenkinsHueCobraAwDev = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/Cobra/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueCobraAwTa = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/Cobra/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueApp = new JenkinsHue({
    jenkins: {
        host: 'http://congostar-congo-ci.proxy/view/App/view/Monitoring%20(Lampe)/'
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
    jenkinsHueCobraAwDev.setLightForJenkinsView(LIGHT_ID_TABLE_COBR_AW_1);
    jenkinsHueCobraAwTa.setLightForJenkinsView(LIGHT_ID_TABLE_COBR_AW_2);
    jenkinsHueApp.setLightForJenkinsView(LIGHT_ID_TABLE_SILAS);
    jenkinsHuePipeline.setLightForJenkinsView(LIGHT_ID_PIPELINE);
    jenkinsHueCongstarTeamTYPO3Upgrade.setLightForJenkinsView(LIGHT_ID_TYPO3_UPGRADE);
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
    jenkinsHueCobraAwDev.hue.switchOff(LIGHT_ID_TABLE_COBR_AW_1);
    jenkinsHueCobraAwTa.hue.switchOff(LIGHT_ID_TABLE_COBR_AW_2);
    jenkinsHueApp.hue.switchOff(LIGHT_ID_TABLE_SILAS);
    jenkinsHuePipeline.hue.switchOff(LIGHT_ID_PIPELINE);
    jenkinsHueCongstarTeamTYPO3Upgrade.hue.switchOff(LIGHT_ID_TYPO3_UPGRADE);
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
