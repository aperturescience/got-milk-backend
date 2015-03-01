'use strict';

var bunyan = require('bunyan');
var Relayr = require('relayr');

var app_id = 'aafaa8a6-58b5-4f8a-9485-018846e695f3';
var token  = 'jpWnlsJTYBMXmyTjJIq8b4zOS2vYrWw6';
var raw_id = 'b0b4c71d-f2a9-48cf-aed0-41e43ddef222';
//var raw_id = 'e9b5d04d-4e71-41cb-aa5d-d71cdd56fbf7';

var log = bunyan.createLogger({
  name: 'got-milk'
});

var relayr = new Relayr(app_id);

relayr.connect(token, raw_id);

// Connected to the relayr broker
relayr.on('connect', function () {
 log.info('Connected to Relayr');

 setInterval(function() {
  relayr.command(token, raw_id, {
    path: 'led',
    command: 'led',
    value: true
  },
  function (err, code) {
    log.info(err || 'Sent command ' + code);
  });
 }, 2000);
});
