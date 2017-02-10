'use strict';


const test = require('ava');
const nock = require('nock');

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
  t.plan(2);
  const requestGetHeaders = {
    reqheaders: {
      'Authorization': 'Digest username="rambo", realm="https://localhost:3000/api/v1/saml"'
    }
  };
  const found = responseCodes['found'];
  const req = request.agent(requestURL);

  const getScope = nock(requestURL, requestGetHeaders)
    .get(samlUrl)
    .reply(302);

  req
    .get(samlUrl)
    .set(requestGetHeaders.reqheaders)
    .expect(res => {
      t.is(res.status, found, '302 Status Code should be returned');
    })
    .end(() => {
      t.is(getScope.isDone(), true, `GET ${samlUrl} Nock Spy called`);
      t.end();
    });
});
