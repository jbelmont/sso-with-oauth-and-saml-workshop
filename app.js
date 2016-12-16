const restify = require('restify');
const {readFileSync} = require('fs');
const {join} = require('path');

// Load Environment Variables
require(join(__dirname, 'config/config'))["dotEnvConfig"];

const port = process.env["PORT"] || 8080;

var app = restify.createServer({
  certificate:readFileSync(join(__dirname, 'path/to/server/certificate')),
  key: readFileSync(join(__dirname, 'path/to/server/key')),
  name: 'SSO with Oauth and SAML',
});

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());

app.listen(port, () => {
	console.log('server listening on port number', port);
});

require('./routes')(app);