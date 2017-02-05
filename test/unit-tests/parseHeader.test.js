'use strict';

const test = require('ava');

test('parseHeader should return an object with fields parsed from authorization header', assert => {
  const parseHeader = require('../../utils/parseHeader').parseHeader;
  const actual = parseHeader(
    'Digest username="rambo", realm="https://localhost:3000/api/v1/digestScheme", nonce="Et2azM0urkTJmDb18rZnnwQb3", uri="/api/v1/digestScheme", response="98272be7c8fd10f0131954a3231b1341", opaque="cmFtYm86c29sZGllcjphcm15"'
  );
  const expected = {
    nonce: 'Et2azM0urkTJmDb18rZnnwQb3',
    opaque: 'cmFtYm86c29sZGllcjphcm15',
    realm: 'https://localhost:3000/api/v1/digestScheme',
    response: '98272be7c8fd10f0131954a3231b1341',
    uri: '/api/v1/digestScheme'
  };
  assert.deepEqual(actual, expected, `should return ${expected}`);
});
