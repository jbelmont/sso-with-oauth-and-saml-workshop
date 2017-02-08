const restify = require('restify');
const passport = require('passport');
const {readFileSync} = require('fs');
const {join} = require('path');

// Load Environment Variables
require('./config/config')['dotEnvConfig'];

const port = process.env['PORT'] || 3000;

const app = restify.createServer({
  certificate: readFileSync(join(__dirname, 'ca/cert.pem')),
  key: readFileSync(join(__dirname, 'ca/key.pem')),
  name: 'SSO with Oauth and SAML'
});

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());

app.listen(port, () => {
  console.log('server listening on port number', port);
});

const env = process.env.NODE_ENV || 'development';
const config = require('./constants')[env];
require('./config/passport')(passport, config);

// Load api endpoints.
require('./routes')(app);
require('./auth')(app);
require('./admin/createToken')(app);
require('./auth/samlRoute')(app, config, passport);

module.exports = app;
