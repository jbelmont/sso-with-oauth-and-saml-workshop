'use strict';

const test = require('ava');
const nonce = require('../../utils/nonce').nonce;

function nonceBuilder(UPPER_BOUND) {
  let nonceCollection = [];
  for (let i = 0; i < UPPER_BOUND; i++) {
    nonceCollection.push(nonce(i));
  }
  return nonceCollection;
}

test('nonce should return a unique value no matter how many times it is invoked', assert => {
  const NONCE_TESTS =  100;
  const actual = nonceBuilder(NONCE_TESTS);
  const expected = nonceBuilder(NONCE_TESTS);
  assert.notDeepEqual(actual, expected);
});

test('simpleDigestScheme should return a digest scheme', assert => {
  const {simpleDigestScheme} = require('../../utils/digestScheme');
  const actual = simpleDigestScheme({
    username: 'jbelmont',
    password: 'badMamaJama',
    realm: 'testrealm@host.com',
    length: 10
  });
  assert.truthy(actual);
});

test('secureDigestScheme should return a digest scheme', assert => {
  const {secureDigestScheme} = require('../../utils/digestScheme');
  const actual = secureDigestScheme({
    username: 'jbelmont',
    password: 'badMamaJama',
    realm: 'testrealm@host.com',
    length: 10
  });
  assert.truthy(actual);
});
