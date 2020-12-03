#!/usr/bin/env node

// setup Jasmine
const Jasmine = require('jasmine')
const jasmine = new Jasmine()
jasmine.loadConfigFile('./spec/support/jasmine.json')
jasmine.onComplete(function(passed) {
  if(passed) {
    console.log('Wow!!! You have written a nice code');
  }
  else {
    console.log('WTF!!! What the suck code!!! Bastard, you want me to run this code???? Kidding me????');
  }
})
jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000

// setup console reporter
const TSConsoleReporter = require('jasmine-ts-console-reporter')

// initialize and execute
jasmine.env.clearReporters();
jasmine.env.addReporter(new TSConsoleReporter());
jasmine.execute();