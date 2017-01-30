[![Build Status](https://travis-ci.org/Code-Craftsmanship-Saturdays/sso-with-oauth-and-saml.svg?branch=master)](https://travis-ci.org/Code-Craftsmanship-Saturdays/sso-with-oauth-and-saml)
[![Coverage Status](https://coveralls.io/repos/github/Code-Craftsmanship-Saturdays/sso-with-oauth-and-saml/badge.svg?branch=master)](https://coveralls.io/github/Code-Craftsmanship-Saturdays/sso-with-oauth-and-saml?branch=master)

# Authentication, Authorization, Oauth, SAML

## Basic Authentication with HTTP

> "HTTP/1.0", includes the specification for a Basic Access
Authentication scheme. This scheme is not considered to be a secure
method of user authentication (unless used in conjunction with some
external secure system such as SSL [5]), as the user name and
password are passed over the network as cleartext.

[Basic Authentication RFC2617](https://tools.ietf.org/html/rfc2617)

If an HTTP receives an anonymous request for a protected resource it can force the use of Basic authentication by rejecting the request with a 401 (Access Denied) status code and setting the WWW-Authenticate response header as shown below:

```HTTP
HTTP/1.1 401 Access Denied
WWW-Authenticate: Basic realm="My Server"
Content-Length: 0
```

* :scroll: [Basic Auth Examples](docs/basic-auth.md)


## Digest Schemes
> the Digest scheme is based on a
simple challenge-response paradigm. The Digest scheme challenges
using a nonce value. A valid response contains a checksum (by
default, the MD5 checksum) of the username, the password, the given
nonce value, the HTTP method, and the requested URI. In this way, the
password is never sent in the clear. Just as with the Basic scheme,
the username and password must be prearranged in some fashion not
addressed by this document.

[Digest Schemes RFC2617](https://tools.ietf.org/html/rfc2617)

* :scroll: [Digest Schemes Examples](docs/digest-schemes.md)

## Single Sign-On (SSO) with Oauth and SAML

### SSO
SSO (Single Sign On) occurs when a user logs in to one Client and is then signed in to other Clients automatically, regardless of the platform, technology, or domain the user is using.

Single sign-on (SSO) is a session and user authentication service that permits a user to use one set of login credentials (e.g., name and password) to access multiple applications.
The service authenticates the end user for all the applications the user has been given rights to and eliminates further prompts when the user switches applications during the same session.

[SSO](https://www.sitepoint.com/single-sign-on-explained/)
**A good example of the use of SSO is in Google’s services. You need only be signed in to one primary Google account to access different services like YouTube, Gmail, Google+, Google Analytics, and more.**
