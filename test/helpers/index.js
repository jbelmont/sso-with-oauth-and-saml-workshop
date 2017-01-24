'use strict';

const foo = () => {
  return new Error('Foo');
};

global.td = require('testdouble');

exports.foo = foo;
exports.td = global.td;
