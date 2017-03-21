'use strict';

const { connect, disconnect, tor, network } = require('node-tor-control');

const config = {
  password: process.env.TOR_PASSWORD,
};

async function withTorConnection(cb) {
  try {
    const connection = await connect(config);
    await cb(connection);
    await disconnect(connection);
  } catch (e) {
    console.error(e);
  }
}

// custom functions

async function socksInfo(networkName) {
  try {
    const info = await network.getSocksProxyInfo(networkName);
    console.log(info);
  } catch (e) {
    console.error(e);
  }
}

// signals

function dump() {
  withTorConnection(async (conn) => {
    const res = await tor.signalDump(conn);
    console.log(res);
  });
}

function newnym() {
  withTorConnection(async (conn) => {
    const res = await tor.signalNewNYM(conn);
    console.log(res);
  });
}

// commands

function getInfo(keys) {
  if (!(keys && Array.isArray(keys) && keys.length > 0)) {
    console.log('please provide info keys you are interested in');
    return;
  }

  withTorConnection(async (conn) => {
    const res = await tor.getInfo(conn, keys);
    console.log(JSON.stringify(res));
  });
}

module.exports = {
  socksInfo,
  dump,
  newnym,
  getInfo,
};

