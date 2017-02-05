> The Digest Access Authentication scheme is not intended to be a
complete answer to the need for security in the World Wide Web. This
scheme provides no encryption of message content. The intent is
simply to create an access authentication method that avoids the most
serious flaws of Basic authentication.

[Digest Access Authentication](https://tools.ietf.org/html/rfc2617#page-6)

## Digest Authentication

> The Digest scheme is based on a simple challenge-response paradigm.
The Digest scheme challenges using a nonce value and might indicate
that username hashing is supported.  A valid response contains an
unkeyed digest of the username, the password, the given nonce value,
the HTTP method, and the requested URI.

Digest access authentication was originally specified by RFC 2069 (An Extension to HTTP: Digest Access Authentication).
RFC 2069 specifies roughly a traditional digest authentication scheme with security maintained by a server-generated noncevalue.
The authentication response is formed as follows (where HA1 and HA2 are names of string variables):

[MD5 Algorithm](https://en.wikipedia.org/wiki/MD5)
**MD5 is an algorithm that produces a hash**

`ha1 = md5(username:realm:password)`
`ha2 = md5(HTTPMethod:digestURI)`
`response = md5(ha1:nonce:ha2)`

```javascript
function md5({ str, encoding = 'hex' }) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest(encoding);
}
```

A custom md5 function that uses `nodejs` crypto library.

Test usage for md5 to compute `ha1`
```javascript
test('mdf5 should compute challenge when given ha2, nonce, cnonce, and qop', assert => {
  const md5 = require('../../utils/md5').md5;
  const ha2 = md5({
    str: 'GET:/api/v1/digestScheme'
  });
  const actual = md5({
    str: `${ha2}:${process.env.NONCE}:${process.env.NONCE}:auth`
  });
  const expected = 'adc91a91ffaa68815d5a5d8e4ed8d9e9';
  assert.is(actual, expected, `should return ${expected}`);
});
```

## The WWW-Authenticate Response Header Field
Set HTTP header like so
```javascript
res.setHeader(
  'WWW-Authenticate',
  `Digest realm="https://localhost:3000/api/v1/digestScheme",
  qop="auth, auth-int", algorithm=MD5,
  nonce="${process.env.NONCE}",
  opaque="${process.env.OPAQUE}"`
);
```

Server Challenge computed as follows
```javascript
function serverResponse({ ha2, nonce, cnonce, qop }) {
  return md5({
    str: `${ha2}:${nonce}:${cnonce}:${qop}`
  });
}
```

Checking client response with server response and if they match return authenticated property
```javascript
if (clientChallenge !== serverChallenge) {
    res.setHeader(
      'WWW-Authenticate',
      `Digest realm="https://localhost:3000/api/v1/digestScheme",
      qop="auth, auth-int", algorithm=MD5,
      nonce="${process.env.NONCE}",
      opaque="${process.env.OPAQUE}"`
    );
    res.send(responseCodes['unauthorized']);
} else {
  res.send(responseCodes['ok'], {
    authenticated: true
  });
}
```
