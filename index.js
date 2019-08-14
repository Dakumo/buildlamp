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

app.get('/', function (req, res) {
  	auth(req,res, () => res.send("Access allowed"))
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
