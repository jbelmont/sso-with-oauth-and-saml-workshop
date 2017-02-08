'use strict';

const test = require('ava');
const url = require('url');
const SAML = require('passport-saml-restify').SAML;

let saml, req;
test.before('setup SAML entrypoint', () => {
  saml = new SAML({
    entryPoint: 'https://localhost:3000/api/v1/saml'
  });
  req = {
    protocol: 'https',
    headers: {
      host: 'localhost'
    }
  };
});

test.cb('getAuthorizeUrl should return url and properties', t => {
  t.plan(4);
  saml.getAuthorizeUrl(req, (err, target) => {
    const actual = url.parse(target);
    const expected = 'localhost:3000';

    t.is(actual['host'], expected, `should equal ${actual['host']}`);
    t.is(actual['protocol'], 'https:', `should equal ${actual['protocol']}`);
    t.is(actual['pathname'], '/api/v1/saml', `should equal ${actual['pathname']}`);

    const queryKey = Object.keys(url.parse(target, true).query)[0];
    t.is(queryKey, 'SAMLRequest');
    t.end();
  });
});
