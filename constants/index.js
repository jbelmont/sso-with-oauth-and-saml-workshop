module.exports = {
  responseCodes: {
    created: 201,
    ok: 200,
    unauthorized: 401,
    found: 302
  },
  requestURL: 'https://localhost:3000',
  endPoints: {
    createTokenUrl: '/api/v1/createToken',
    basicAuthUrl: '/api/v1/basicAuth',
    digestSchemeUrl: '/api/v1/digestScheme',
    samlUrl: '/api/v1/saml',
    indexRouteUrl: '/'
  },
  development: {
    app: {
      name: 'SSO with SAML and Oauth',
      port: process.env.PORT || 3000
    },
    passport: {
      strategy: 'saml',
      saml: {
        path: process.env.SAML_PATH || '/api/v1/saml',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://localhost:3000/api/v1/saml',
        issuer: 'passport-saml',
        cert: process.env.SAML_CERT || null
      }
    }
  }
};
