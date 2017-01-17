const test = require('ava');
const {join} = require('path');
const nock = require('nock');
const {
    responseCodes,
    requestURL,
    endPoints
} = require(join(__dirname, '../../constants/constants'));
const request = require('supertest')(requestURL);

let postScope, requestBody;
test.before(t => {
  const requestPostHeaders = {
    reqheaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  const postPayload = {
    'adminToken':       'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5Ub2tlbiIsImlhdCI6MTQ4MTg5Mzc5NX0.iyMTriXEK56YjNJguu-kLLkyOMZ37vmB1xA7biy1sPRcWo7zLAPoV0zQ99jxDyoB1Sr4do_fyfcaWGOmLb-DHndah42_IbH326gJJZ-ReOnavD_FfbHnsy-ibYvx61uqR9zLpwvlxfTxvw_XC1P2L4x63ejQGGz4vcGIqIhyB9ZiL20aDPQLUNCZ_Lht_yZXxC3ZpooYLV1Ow26NefNhjGPHNwUsydJf_AHX9O6g36gc1-jZdUTU5eR73flaRdzR9V5f7Jd1JZRY2K7XlsZlft2hvnwnh1IUtZJwNgkwSxAidRmrRIt0buxBhdyx81z6K7gLpUvgOJCCM9sc-MGF9g'
  };

  requestBody = {
    'name': 'adminToken'
  };

  postScope = nock(requestURL, requestPostHeaders)
        .post('/api/v1/couch/insertDocument/bucks', requestBody)
        .reply(201, postPayload);
  t.pass(true);
});

test.after('cleanup', t => {
  nock.cleanAll();
  t.pass(true);
});

test('createToken should return jwt', t => {
  const created = responseCodes['created'];
  request
        .post(endPoints['createTokenUrl'])
        .set({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
        .send(requestBody)
        .expect(res => {
          t.is(res.status, created, '201 Status Code returned');
          t.truthy(res.body.adminToken, 'Body should have adminToken property');
        })
        .end(() => {
          t.is(postScope.isDone(), true, `POST ${endPoints.createTokenUrl} Nock Spy called`);
          t.pass();
        });
});
