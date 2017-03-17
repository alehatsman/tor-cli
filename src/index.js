'use strict';

const commander = require('commander');
const { connect, disconnect, tor } = require('tor-control');

async function withTorConnection(cb) {
  const connection = await connect({ password: process.env.TOR_PASSWORD });
  await cb(connection);
  await disconnect(connection);
}

commander
  .version('0.0.1');

commander
  .command('dump')
  .action(() => {
    withTorConnection(async (conn) => {
      const res = await tor.signalDump(conn);
      console.log(res);
    });
  });

commander
  .command('newnym')
  .action(() => {
    withTorConnection(async (conn) => {
      const res = await tor.signalNewNYM(conn);
      console.log(res);
    });
  });

commander.parse(process.argv);

