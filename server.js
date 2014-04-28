var JenkinsHue = require('jenkins-hue');
var moment = require('moment');
var INTERVAL = 5 * 1000;
var switchedOn = true;

var jenkinsHueCongstar = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@development-congstar.aoe-works.de:8080/view/%20%20Congstar/view/Monitoring'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

var jenkinsHueColumbus = new JenkinsHue({
    jenkins: {
        host: 'http://monitoring:andy4711congo@development-congstar.aoe-works.de:8080/view/%20Columbus/view/Monitoring/'
    },
    hue: {
        host: '10.165.103.252',
        username: 'newdeveloper'
    }
});

function isItWorkingTime() {
    var dayBegin = moment().hour(8).minute(0);
    var dayEnd = moment().hour(22).minute(41);
    var isoWeekdaySaturday = 6;
    var isoWeekdaySunday = 7;
    var now = moment();

    if (now.isBefore(dayBegin) ||
        now.isAfter(dayEnd) ||
        now.isoWeekday() === isoWeekdaySaturday ||
        now.isoWeekday() === isoWeekdaySunday) {
        return false;
    }

    return true;
}

function updateLights() {
    // Columbus
    jenkinsHueColumbus.setLightForJenkinsView(1);

    // Tisch Bilal
    jenkinsHueCongstar.setLightForJenkinsView(2);

    // Tisch Florian
    jenkinsHueCongstar.setLightForJenkinsView(3);
}

setInterval(function() {
    "use strict";

    if (isItWorkingTime()) {
        if (switchedOn === false) {
            switchedOn = true;
            console.log(moment().format(), "LIGHTS SWITCHED ON");
        }
        updateLights();
        console.log(moment().format(), "LIGHTS UPDATED");
    } else {
        if (switchedOn === true) {
            jenkinsHueCongstar.hue.switchOff(1);
            jenkinsHueCongstar.hue.switchOff(2);
            jenkinsHueCongstar.hue.switchOff(3);
            switchedOn = false;
            console.log(moment().format(), "LIGHTS SWITCHED OFF");
        }
    }
}, INTERVAL);