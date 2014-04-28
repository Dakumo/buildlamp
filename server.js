var JenkinsHue = require('jenkins-hue');
var moment = require('moment');
var INTERVAL = 5 * 1000;

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

var dayBegin = moment().hour(7).minute(0);
var dayEnd = moment().hour(19).minute(0);

setInterval(function() {
    "use strict";

    if (moment().isBefore(dayBegin) || moment().isAfter(dayEnd)) {
        console.log(moment().format() + ' SWITCHED OFF');
        jenkinsHueColumbus.hue.switchOff(1);
        jenkinsHueColumbus.hue.switchOff(2);
        jenkinsHueColumbus.hue.switchOff(3);
        return;
    }

    // Columbus
    jenkinsHueColumbus.setLightForJenkinsView(1);

    // Tisch Bilal
    jenkinsHueCongstar.setLightForJenkinsView(2);

    // Tisch Florian
    jenkinsHueCongstar.setLightForJenkinsView(3);

	console.log(moment().format() + "TICK");
}, INTERVAL);
