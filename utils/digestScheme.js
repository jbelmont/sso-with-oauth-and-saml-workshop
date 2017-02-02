'use strict';

const {nonce} = require('./nonce');
const {md5} = require('./md5');

function simpleDigestScheme({username, password, realm}) {
  return md5({ str : `${username}:${realm}:${password}`});
}

function secureDigestScheme({username, password, realm, length}) {
  return md5({ str: md5({ str: `${username}:${realm}:${password}:${nonce}:${nonce(length)}` }) });
}

module.exports = {
  simpleDigestScheme,
  secureDigestScheme
};
