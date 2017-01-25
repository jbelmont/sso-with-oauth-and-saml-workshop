'use strict';

const test = require('ava');

test('base64 should base64 encode string', assert => {
  const base64 = require('../../utils/base64').base64;
  const actual = base64({
    alg: 'HS256'
  });
  const expected = 'eyJhbGciOiJIUzI1NiJ9';
  assert.is(actual, expected, `should return ${expected}`);
});

test('encode should return base64 encoded string', assert => {
  const header = {
    alg: 'HS256'
  };

  const payload = {
    name: 'John Rambo',
    rank: 'Sergeant',
    branch: 'Army'
  };

  const encodeUnsignedJWT = require('../../utils/encode').encodeUnsignedJWT;
  const actual = encodeUnsignedJWT({
    header,
    payload
  });
  const expected = 'IntcImFsZ1wiOlwiSFMyNTZcIn0i.IntcIm5hbWVcIjpcIkpvaG4gUmFtYm9cIixcInJhbmtcIjpcIlNlcmdlYW50XCIsXCJicmFuY2hcIjpcIkFybXlcIn0i';
  assert.is(actual, expected, `should return ${expected}`);
});

test('decode should return base64 decoded string', assert => {
  const header = {
    alg: 'HS256'
  };

  const payload = {
    name: 'John Rambo',
    rank: 'Sergeant',
    branch: 'Army'
  };

  const encodeUnsignedJWT = require('../../utils/encode').encodeUnsignedJWT;
  const encoded = encodeUnsignedJWT({
    header,
    payload
  });

  const decodeUnsignedJWT = require('../../utils/decode').decodeUnsignedJWT;
  const actual = decodeUnsignedJWT(encoded);
  const expected = {
    header: '{"alg":"HS256"}',
    payload: '{"name":"John Rambo","rank":"Sergeant","branch":"Army"}'
  };
  assert.deepEqual(actual, expected, `should return ${expected}`);
});

test('b64 should return base64 encoded string', assert => {
  const b64 = require('../../utils/base64').b64;
  const actual = b64('jbelmont');
  const expected = 'ImpiZWxtb250Ig==';
  assert.is(actual, expected, `should return ${expected}`);
});

test('encodeBasicAuth should return base64 encoded string for Basic Auth', assert => {
  const encodeBasicAuth = require('../../utils/encode').encodeBasicAuth;
  const actual = encodeBasicAuth({
    username: 'jbelmont',
    password: 'krisyKreme1937'
  });
  const expected = 'basic ImpiZWxtb250OmtyaXN5S3JlbWUxOTM3Ig==';
  assert.is(actual, expected, `should return ${expected}`);
});

test('decodeBasicAuth should return decoded username and password', assert => {
  const encodeBasicAuth = require('../../utils/encode').encodeBasicAuth;
  const encoded = encodeBasicAuth({
    username: 'jbelmont',
    password: 'krisyKreme1937'
  });
  const decodeBasicAuth = require('../../utils/decode').decodeBasicAuth;
  const actual = decodeBasicAuth(encoded);
  const expected = {
    username: '"jbelmont',
    password: 'krisyKreme1937"'
  };
  assert.deepEqual(actual, expected, `should return ${expected}`);
});
