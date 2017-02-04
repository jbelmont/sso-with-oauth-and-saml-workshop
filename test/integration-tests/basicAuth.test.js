'use strict';

const test = require('ava');
const {join} = require('path');
const nock = require('nock');

// Set this for TLS rejection issues
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const {
    responseCodes,
    requestURL,
    endPoints
} = require(join(__dirname, '../../constants'));
const basicAuthUrl = endPoints['basicAuthUrl'];

const request = require('supertest');

let getScope, responseBody;
test.before(() => {
  const requestGetHeaders = {
    reqheaders: {
      'Authorization': 'Basic cmFtYm86c29sZGllcg=='
    }
  };

  /* eslint-disable */
  responseBody = {
    "credentials": {
      "username": "rambo",
      "password": "soldier"
    }
  };
  /* eslint-enable */

  getScope = nock(requestURL, requestGetHeaders)
        .get(basicAuthUrl)
        .reply(200, responseBody);
});

test.after('cleanup', () => {
  nock.cleanAll();
});

test('basicAuth endpoint should return an object with username and password from authorization header', async assert => {
  assert.plan(3);
  const ok = responseCodes['ok'];
  const req = request.agent(requestURL);
  const res = await req
    .get(basicAuthUrl)
    .set({
      'Authorization': 'Basic cmFtYm86c29sZGllcg=='
    });
  assert.is(res.status, ok, '200 Status Code returned');
  assert.truthy(res.body.credentials, 'Body should have credentials property');
  assert.is(getScope.isDone(), true, `POST ${endPoints.createTokenUrl} Nock Spy called`);
});
