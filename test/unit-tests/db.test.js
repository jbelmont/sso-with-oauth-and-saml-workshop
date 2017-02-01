'use strict';

const {join} = require('path');
const test = require('ava');

const td = require('../helpers').td;
require(join(__dirname, '../../config/config'))['dotEnvConfig'];

let dbActions;
test.before(() => {
  dbActions = td.function('.dbActions');
  td.when(dbActions()).thenReturn(Promise.resolve(() => {}));
});

test.after(() => {
  td.reset();
});

test('rethinkdb should return a connection with rethink.connect call', assert => {
  dbActions().then(connection => assert.truthy(connection));
});
