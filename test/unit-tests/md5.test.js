'use strict';

const test = require('ava');

test('md5 should return md5 hash of given string', assert => {
  const md5 = require('../../utils/md5').md5;
  const actual = md5({str: 'Bruce Leroy'});
  const expected = 'd51b11438b45475d237ed7480ca78ed8';
  assert.is(actual, expected, `should return ${expected}`);
});

test('md5 should compute ha2 value when given http method and uri', assert => {
  const md5 = require('../../utils/md5').md5;
  const actual = md5({
    str: 'GET:/api/v1/digestScheme'
  });
  const expected = '475c0cb0639900c7d92322bc5bb65910';
  assert.is(actual, expected, `should return ${expected}`);
});

test('mdf5 should compute challenge when given ha2, nonce, cnonce, and qop', assert => {
  const md5 = require('../../utils/md5').md5;
  const ha2 = md5({
    str: 'GET:/api/v1/digestScheme'
  });
  const actual = md5({
    str: `${ha2}:${process.env.NONCE}:${process.env.NONCE}:auth`
  });
  const expected = 'adc91a91ffaa68815d5a5d8e4ed8d9e9';
  assert.is(actual, expected, `should return ${expected}`);
});
