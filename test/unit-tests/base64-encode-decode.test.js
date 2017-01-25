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

  const encode = require('../../utils/encode').encode;
  const actual = encode({
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

  const encode = require('../../utils/encode').encode;
  const encoded = encode({
    header,
    payload
  });

  const decode = require('../../utils/decode').decode;
  const actual = decode(encoded);
  const expected = {
    header: '{"alg":"HS256"}',
    payload: '{"name":"John Rambo","rank":"Sergeant","branch":"Army"}'
  };
  assert.deepEqual(actual, expected, `should return ${expected}`);
});
