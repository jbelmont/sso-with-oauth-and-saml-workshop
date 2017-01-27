'use strict';

const test = require('ava');
const {join} = require('path');
require(join(__dirname, '../../app'));
const request = require('supertest');

test('basicAuth endpoint should return an object with username and password from authorization header', assert => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const req = request.agent('https://localhost:3000');
  req
    .get('/api/v1/basicAuth')
    .set('Authorization', 'basic ImpiZWxtb250Ig==')
    .expect(200)
    .end((err, res) => {
      assert.deepEqual(res.body, { credentials: { username: '"jbelmont"' } });
    });
});
