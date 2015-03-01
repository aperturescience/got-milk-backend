'use strict';

var util   = require('util');
var bunyan = require('bunyan');
//var api    = require('./lib/apiHelper');
//var rMQTTM = require('./lib/rMQTT');
var mqtt   = require('mqtt');
//var certificates = require('./lib/certificate');
var Relayr = require('relayr');

//var rMQTT = new rMQTTM();

var app_id = 'aafaa8a6-58b5-4f8a-9485-018846e695f3';
var token  = 'jpWnlsJTYBMXmyTjJIq8b4zOS2vYrWw6';
// var raw_id = 'b0b4c71d-f2a9-48cf-aed0-41e43ddef222';
//var raw_id = 'e9b5d04d-4e71-41cb-aa5d-d71cdd56fbf7';
var channel_id = '73927f8d-5135-40d0-9aa9-3837cee5e1e3';

var log = bunyan.createLogger({
  name: 'got-milk'
});
log.level('debug');

// var relayr = new Relayr(app_id);

// relayr.connect(token, '73927f8d-5135-40d0-9aa9-3837cee5e1e3');

// relayr.on('data', function (topic, data) {
//   log.info(topic + ':' + util.inspect(data));
// });

// // Connected to the relayr broker
// relayr.on('connect', function () {
//  log.info('Connected to Relayr');
// });

log.debug('connecting');
var client = mqtt.connect({
      servers: [{
        'host': 'mqtt.relayr.io',
        'port': 8883
      }],
      username: 'd4b7cc40-e399-4367-8ab6-90f165a98315',
      password: 'EP6d.Q9CD9h5',
      clientId: 'GotMilk!',
      protocol: 'mqtts',
      certPath: __dirname + '/lib/relayr.crt',
      rejectUnauthorized: false
    });

client.on('connect', function() {
  log.info('Connected to the MQTT broker');

  client.subscribe('/v1/' + channel_id + '/#');

  setInterval(function() {
    client.publish('/v1/' + channel_id, JSON.stringify({
      weight: Math.random() * 1000
    }));
  }, 3000);
});

client.on('message', function(topic, message) {
  log.debug(topic + ':' + message);
});