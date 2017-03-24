'use strict';

/* eslint no-console: 0 */

const { connect, disconnect, tor, socks } = require('node-tor-control');

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

// socks actions

async function socksInfo(networkName) {
  try {
    const info = await socks.getSocksProxyInfo(networkName);
    console.log(`
      Enabled: ${info.enabled}\r
      Server: ${info.server}\r
      Port: ${info.port}\r
      Auth enabled: ${info.authEnabled}\r
    `);
  } catch (e) {
    console.error(e);
  }
}

async function enableSocksProxy(networkName) {
  try {
    const info = await socks.enableSocksProxy(networkName);
    console.log(info);
  } catch (e) {
    console.error(e);
  }
}

async function disableSocksProxy(networkName) {
  try {
    const info = await socks.disableSocksProxy(networkName);
    console.log(info);
  } catch (e) {
    console.error(e);
  }
}

// signals

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
  enableSocksProxy,
  disableSocksProxy,
  newnym,
  getInfo,
};

