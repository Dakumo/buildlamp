var express = require('express');
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var app = express();

var host = "10.79.200.114",
    username = "MdXLTqFFHk08H1in-Z0DW3dRuY4jlHmfNA72VcFX",
    api = new HueApi(host, username),
    state = lightState.create();

var lampList = new Map();
lampList.set("team1", 6);
lampList.set("team2", 8);

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var auth = function(req, res, runFunction) {
	var token = req.query.token;
	if (token === "access_token") {
		runFunction()
	} else {
		res.send("Access denied");
	}
};

var changeState = function(updatedState) {
	for (var [key, value] of lampList.entries()) {
		api.setLightState(value, updatedState, function(err, result) {
			if (err) throw err;
			displayResult(result);
		});
	}
}

app.get('/', function (req, res) {
  	auth(req,res, () => res.send("Access allowed"))
});

app.get('/on', function (req, res) {
	auth(req,res, () => changeState(state.on().rgb(0,255,0)))
});

app.get('/off', function (req, res) {
	auth(req,res, () => changeState(state.off()))

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
