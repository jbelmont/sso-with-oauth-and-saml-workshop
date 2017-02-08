'use strict';

const { spawn } = require('child_process');
spawn('rethinkdb');

const test = require('ava');
require('../../app');

const {
    responseCodes,
    requestURL,
    endPoints
} = require('../../constants');

const samlUrl = endPoints['samlUrl'];

const request = require('supertest');

// Stop tls rejections.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

test.cb('saml endpoint', t => {
  t.plan(1);
  const found = responseCodes['found'];
  const req = request.agent(requestURL);
  req
    .get(samlUrl)
    .set({
      'Authorization': 'Digest username="rambo", realm="https://localhost:3000/api/v1/digestScheme"'
    })
    .expect(res => {
      t.is(res.status, found, '302 Status Code should be returned');
    })
    .end(() => {
      t.end();
    });
});
