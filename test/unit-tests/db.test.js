'use strict';

const {join} = require('path');
const test = require('ava');

const td = require('../helpers').td;
require(join(__dirname, '../../config/config'))['dotEnvConfig'];

let rethinkdb;
test.before(() => {
  rethinkdb = td.replace('../../db/db');
  td.when(rethinkdb.dbActions()).thenReturn(Promise.resolve(() => {}));
});

test.after(() => {
  td.reset();
});

test('rethinkdb should return a connection with rethink.connect call', assert => {
  rethinkdb.dbActions().then(connection => assert.truthy(connection));
});
