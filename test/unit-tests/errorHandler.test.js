const test = require('ava');

const errorHandler = require('../../errorHandler');

test('check error object returned from errorHandler with no arguments', assert => {
  try {
    assert.throws(errorHandler.generateError({
      err: new Error('unauthorized access'),
      moduleName: 'access',
      statusCode: 401
    }));
  } catch(err) {
    assert.pass(true);
  }
});

test('check error object from errorHandler with proper arugments', assert => {
  const foo = require('./foo').foo();
  const actual = errorHandler.generateError({
    err: foo,
    moduleName: 'foo',
    statusCode: 'foo error'
  });
  const expected = {
    statusCode: 'foo error',
    message: 'Foo Error: Foo',
    errorLineAndColumn: 'foo:2:10)'
  };
  assert.deepEqual(actual, expected, `should return ${expected}`);
});
