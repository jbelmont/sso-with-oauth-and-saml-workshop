'use strict';

module.exports = (app, config, passport) => {
  app.post(config.passport.saml.path,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/',
        failureFlash: true
      }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/api/v1/saml',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/',
        failureRedirect: '/'
      })
  );
};
