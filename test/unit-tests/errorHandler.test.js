'use strict';

const test = require('ava');

const errorHandler = require('../../errorHandler');

test('check error object returned from errorHandler with no arguments', assert => {
  assert.throws(() => errorHandler.generateError({
    err: new Error('unauthorized access'),
    moduleName: 'access',
    statusCode: 401
  }), TypeError);
});

test('check error object from errorHandler with proper arguments', assert => {
  const foo = require('../helpers').foo();
  const actual = errorHandler.generateError({
    err: foo,
    moduleName: 'foo',
    statusCode: 'foo error'
  });
  const expected = {
    statusCode: 'foo error',
    message: 'Foo Error: Foo',
    errorLineAndColumn: 'foo:4:10)'
  };
  assert.deepEqual(actual, expected, `should return ${expected}`);
});
