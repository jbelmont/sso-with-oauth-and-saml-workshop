'use strict';

const test = require('ava');
const {join} = require('path');
const nock = require('nock');

const {
    responseCodes,
    requestURL,
    endPoints
} = require(join(__dirname, '../../constants/constants'));

const request = require('supertest')(requestURL);

let getScope, postPayload;
test.before(t => {
  const requestPostHeaders = {
    reqheaders: {
      'Accept': 'application/json'
    }
  };


  postPayload = {
    // eslint-disable-next-line
    "users": "[{\"email\":\"handersonj@about.com\",\"first_name\":\"Harry\",\"gender\":\"Male\",\"id\":20,\"last_name\":\"Anderson\"},{\"email\":\"dpayne3@cdbaby.com\",\"first_name\":\"Donna\",\"gender\":\"Female\",\"id\":4,\"last_name\":\"Payne\"},{\"email\":\"eelliott4@pen.io\",\"first_name\":\"Emily\",\"gender\":\"Female\",\"id\":5,\"last_name\":\"Elliott\"},{\"email\":\"jtucker2@tripadvisor.com\",\"first_name\":\"Jonathan\",\"gender\":\"Male\",\"id\":3,\"last_name\":\"Tucker\"},{\"email\":\"smedina1@addthis.com\",\"first_name\":\"Sean\",\"gender\":\"Male\",\"id\":2,\"last_name\":\"Medina\"},{\"email\":\"tcox0@dion.ne.jp\",\"first_name\":\"Timothy\",\"gender\":\"Male\",\"id\":1,\"last_name\":\"Cox\"},{\"email\":\"fwells16@google.es\",\"first_name\":\"Frank\",\"gender\":\"Male\",\"id\":43,\"last_name\":\"Wells\"},{\"email\":\"hwallace5@latimes.com\",\"first_name\":\"Howard\",\"gender\":\"Male\",\"id\":6,\"last_name\":\"Wallace\"},{\"email\":\"jjacksont@icq.com\",\"first_name\":\"Jane\",\"gender\":\"Female\",\"id\":30,\"last_name\":\"Jackson\"},{\"email\":\"cmorriso@theglobeandmail.com\",\"first_name\":\"Cheryl\",\"gender\":\"Female\",\"id\":25,\"last_name\":\"Morris\"},{\"email\":\"jflores9@icq.com\",\"first_name\":\"Joan\",\"gender\":\"Female\",\"id\":10,\"last_name\":\"Flores\"},{\"email\":\"kfisher8@wunderground.com\",\"first_name\":\"Kenneth\",\"gender\":\"Male\",\"id\":9,\"last_name\":\"Fisher\"},{\"email\":\"nlynche@163.com\",\"first_name\":\"Nancy\",\"gender\":\"Female\",\"id\":15,\"last_name\":\"Lynch\"},{\"email\":\"hkelly7@hubpages.com\",\"first_name\":\"Heather\",\"gender\":\"Female\",\"id\":8,\"last_name\":\"Kelly\"},{\"email\":\"bbennetty@cargocollective.com\",\"first_name\":\"Brenda\",\"gender\":\"Female\",\"id\":35,\"last_name\":\"Bennett\"},{\"email\":\"hsimsp@about.me\",\"first_name\":\"Heather\",\"gender\":\"Female\",\"id\":26,\"last_name\":\"Sims\"},{\"email\":\"whunta@linkedin.com\",\"first_name\":\"Wanda\",\"gender\":\"Female\",\"id\":11,\"last_name\":\"Hunt\"},{\"email\":\"thudsond@bloomberg.com\",\"first_name\":\"Timothy\",\"gender\":\"Male\",\"id\":14,\"last_name\":\"Hudson\"},{\"email\":\"slittleg@cnet.com\",\"first_name\":\"Shawn\",\"gender\":\"Male\",\"id\":17,\"last_name\":\"Little\"},{\"email\":\"nharrisonc@fastcompany.com\",\"first_name\":\"Nicholas\",\"gender\":\"Male\",\"id\":13,\"last_name\":\"Harrison\"},{\"email\":\"jgeorge6@soup.io\",\"first_name\":\"Jacqueline\",\"gender\":\"Female\",\"id\":7,\"last_name\":\"George\"},{\"email\":\"lnichols15@a8.net\",\"first_name\":\"Lillian\",\"gender\":\"Female\",\"id\":42,\"last_name\":\"Nichols\"},{\"email\":\"amoralesq@cbsnews.com\",\"first_name\":\"Andrew\",\"gender\":\"Male\",\"id\":27,\"last_name\":\"Morales\"},{\"email\":\"agordonb@mozilla.com\",\"first_name\":\"Alice\",\"gender\":\"Female\",\"id\":12,\"last_name\":\"Gordon\"},{\"email\":\"eschmidtx@seattletimes.com\",\"first_name\":\"Edward\",\"gender\":\"Male\",\"id\":34,\"last_name\":\"Schmidt\"},{\"email\":\"kperkinss@geocities.com\",\"first_name\":\"Karen\",\"gender\":\"Female\",\"id\":29,\"last_name\":\"Perkins\"},{\"email\":\"bnelsoni@eepurl.com\",\"first_name\":\"Brian\",\"gender\":\"Male\",\"id\":19,\"last_name\":\"Nelson\"},{\"email\":\"spalmerl@canalblog.com\",\"first_name\":\"Scott\",\"gender\":\"Male\",\"id\":22,\"last_name\":\"Palmer\"},{\"email\":\"jwheeler17@mlb.com\",\"first_name\":\"Jean\",\"gender\":\"Female\",\"id\":44,\"last_name\":\"Wheeler\"},{\"email\":\"dkennedyw@umich.edu\",\"first_name\":\"Donald\",\"gender\":\"Male\",\"id\":33,\"last_name\":\"Kennedy\"},{\"email\":\"rstevensf@dedecms.com\",\"first_name\":\"Ryan\",\"gender\":\"Male\",\"id\":16,\"last_name\":\"Stevens\"},{\"email\":\"lcarter13@redcross.org\",\"first_name\":\"Linda\",\"gender\":\"Female\",\"id\":40,\"last_name\":\"Carter\"},{\"email\":\"mnelsonk@tiny.cc\",\"first_name\":\"Michelle\",\"gender\":\"Female\",\"id\":21,\"last_name\":\"Nelson\"},{\"email\":\"imills19@nhs.uk\",\"first_name\":\"Irene\",\"gender\":\"Female\",\"id\":46,\"last_name\":\"Mills\"},{\"email\":\"parnold18@deliciousdays.com\",\"first_name\":\"Phyllis\",\"gender\":\"Female\",\"id\":45,\"last_name\":\"Arnold\"},{\"email\":\"fgarretth@cargocollective.com\",\"first_name\":\"Frances\",\"gender\":\"Female\",\"id\":18,\"last_name\":\"Garrett\"},{\"email\":\"hdaym@geocities.com\",\"first_name\":\"Helen\",\"gender\":\"Female\",\"id\":23,\"last_name\":\"Day\"},{\"email\":\"randerson1a@google.pl\",\"first_name\":\"Rose\",\"gender\":\"Female\",\"id\":47,\"last_name\":\"Anderson\"},{\"email\":\"rrogers1c@digg.com\",\"first_name\":\"Ruby\",\"gender\":\"Female\",\"id\":49,\"last_name\":\"Rogers\"},{\"email\":\"klaner@epa.gov\",\"first_name\":\"Kevin\",\"gender\":\"Male\",\"id\":28,\"last_name\":\"Lane\"},{\"email\":\"bcarrz@desdev.cn\",\"first_name\":\"Bonnie\",\"gender\":\"Female\",\"id\":36,\"last_name\":\"Carr\"},{\"email\":\"atorresn@rediff.com\",\"first_name\":\"Aaron\",\"gender\":\"Male\",\"id\":24,\"last_name\":\"Torres\"},{\"email\":\"jcarpenter1d@furl.net\",\"first_name\":\"Jonathan\",\"gender\":\"Male\",\"id\":50,\"last_name\":\"Carpenter\"},{\"email\":\"rgreenu@csmonitor.com\",\"first_name\":\"Roy\",\"gender\":\"Male\",\"id\":31,\"last_name\":\"Green\"},{\"email\":\"tbailey10@technorati.com\",\"first_name\":\"Tammy\",\"gender\":\"Female\",\"id\":37,\"last_name\":\"Bailey\"},{\"email\":\"showell14@sogou.com\",\"first_name\":\"Scott\",\"gender\":\"Male\",\"id\":41,\"last_name\":\"Howell\"},{\"email\":\"lberryv@so-net.ne.jp\",\"first_name\":\"Louis\",\"gender\":\"Male\",\"id\":32,\"last_name\":\"Berry\"},{\"email\":\"pmurray11@mozilla.com\",\"first_name\":\"Peter\",\"gender\":\"Male\",\"id\":38,\"last_name\":\"Murray\"},{\"email\":\"hlittle1b@google.fr\",\"first_name\":\"Harry\",\"gender\":\"Male\",\"id\":48,\"last_name\":\"Little\"},{\"email\":\"kpeterson12@bandcamp.com\",\"first_name\":\"Kathryn\",\"gender\":\"Female\",\"id\":39,\"last_name\":\"Peterson\"}]"
  };

  getScope = nock(requestURL, requestPostHeaders)
        .get('/')
        .reply(200, postPayload);
  t.pass(true);
});

test.after('cleanup', t => {
  nock.cleanAll();
  t.pass(true);
});


test('index route should return a list of users', assert => {
  const ok = responseCodes['ok'];
  request
    .get(requestURL)
    .set({
      'Accept': 'application/json'
    })
    .expect(res => {
      assert.is(res.status, ok, '200 Status Code returned');
      assert.truthy(res.body.users, 'Body should have users property');
      assert.is(res.body.users, postPayload, `should return ${postPayload}`);
    })
    .end(() => {
      assert.is(getScope.isDone(), true, `GET ${endPoints.indexRouteUrl} Nock Spy called`);
      assert.pass(true);
    });
});
