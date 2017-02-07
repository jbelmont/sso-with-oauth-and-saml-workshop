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

test.cb('get the right host', t => {
  t.plan(1);
  saml.getAuthorizeUrl(req, (err, target) => {
    const actual = url.parse(target).host;
    const expected = 'localhost:3000';
    t.is(actual, expected, `should equal ${expected}`);
    t.end();
  });
});
