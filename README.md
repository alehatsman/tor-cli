# TOR Command Line Interface

Tor-Cli is a utility that allows you easily control your tor process. 
You want to change current identity? - Type torc signal-newnym or using alias tor sn.

**Important**

For now it mostly works only on MAC OS. Sorry.

## Installation

1. Make sure you have installed tor bundle.
  `brew install tor`

2. Install tor cli
  `npm i -g tor-cli`

## Usage

If you set tor control password you need to pass it throw env.

```
torc --help // prints help message

torc socks-info [network] // shows socks-info for network. Defailt for Wi-Fi.
torc enable-socks-proxy [network] // turn on socks proxy for network
torc disable-socks-proxy [network] // turn off socks proxy for network
torc signal-newnym|sn // switch to clean circuits (sn is an alias)
torc getInfo [keys ...] // get information about tor

