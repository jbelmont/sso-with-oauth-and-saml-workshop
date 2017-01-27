'use strict';

const test = require('ava');

test('md5 should return md5 hash of given string', assert => {
  const md5 = require('../../utils/md5').md5;
  const actual = md5({str: 'Bruce Leroy'});
  const expected = 'd51b11438b45475d237ed7480ca78ed8';
  assert.is(actual, expected, `should return ${expected}`);
});
