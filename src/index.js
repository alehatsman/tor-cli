'use strict';

const commander = require('commander');
const actions = require('./actions');

commander
  .version('0.0.1');

// custom functions

commander
  .command('socks-info [network]')
  .description('show socks-info for network')
  .action(network => actions.socksInfo(network));

// signals

commander
  .command('dump')
  .description('log information about open connections and circuits')
  .action(() => actions.dump());

commander
  .command('newnym')
  .description('switch to clean circuits')
  .action(() => actions.newnym());

// commands

commander
  .command('getInfo [keys...]')
  .action(keys => actions.getInfo(keys));

commander.parse(process.argv);

