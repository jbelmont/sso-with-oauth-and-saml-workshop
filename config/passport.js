const SamlStrategy = require('passport-saml-restify').Strategy;

module.exports = (passport, config) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new SamlStrategy({
    path: config.passport.saml.path,
    entryPoint: config.passport.saml.entryPoint,
    issuer: config.passport.saml.issuer,
    cert: config.passport.saml.cert
  },
  (profile, done) => {
    return done(null,
      {
        id: profile.uid,
        email: profile.email,
        displayName: profile.cn,
        firstName: profile.givenName,
        lastName: profile.sn
      });
  }));
};
