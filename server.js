var JenkinsHue = require('jenkins-hue');
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

setInterval(function() {
    // Columbus
    jenkinsHueColumbus.setLightForJenkinsView(1);

    // Tisch Bilal
    jenkinsHueCongstar.setLightForJenkinsView(2);

    // Tisch Florian
    jenkinsHueCongstar.setLightForJenkinsView(3);

	console.log('.');
}, INTERVAL);
