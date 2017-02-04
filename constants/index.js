module.exports = {
  responseCodes: {
    created: 201,
    ok: 200,
    unauthorized: 401
  },
  requestURL: 'https://localhost:3000',
  endPoints: {
    createTokenUrl: '/api/v1/createToken',
    basicAuthUrl: '/api/v1/basicAuth',
    digestSchemeUrl: '/api/v1/digestScheme',
    indexRouteUrl: '/'
  }
};
