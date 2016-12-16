const restify = require('restify');
const {readFileSync} = require('fs');
const {join} = require('path');

// Load Environment Variables
require(join(__dirname, 'config/config'))["dotEnvConfig"];

const port = process.env["PORT"] || 3000;

var app = restify.createServer({
  certificate: readFileSync(join(__dirname, 'ca/cert.pem')),
  key: readFileSync(join(__dirname, 'ca/key.pem')),
  name: 'SSO with Oauth and SAML',
});

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());

app.listen(port, () => {
	console.log('server listening on port number', port);
});

// Load api endpoints.
require('./routes')(app);
require('./admin/createToken')(app);