## Basic Authentication - The client sends the user name and password as unencrypted base64 encoded text.
**Basic Authenthication should only be used with HTTPS, as the password can be easily captured and reused over HTTP.**

### Example of Basic Auth using CURL with neither Authorization header set nor username and password set in url

```HTTP
curl -k -X GET "https://localhost:3000/api/v1/basicAuth"
```

returns the header
```HTTP
WWW-Authenticate →Basic realm="need login credendtials"
```
The HTTP Status Code of `401` meaning unauthorized

Using Basic Auth in url with Curl Command
```HTTP
curl -k -X GET "https://rambo:soldier@localhost:3000/api/v1/basicAuth"
```

returns following response
```json
{
  "credentials": {
    "username": "rambo",
    "password": "soldier"
  }
}
```

#### Providing the following username and password credentials
Username: `rambo`
Password: `soldier`

Using Chrome Developer Tools JavaScript Console:

 `window.btoa("rambo" + ":" + "soldier")` returns base64 encoded string `cmFtYm86c29sZGllcg==`

 Using Node.js Buffer toString Method in node repl

```node
new Buffer('rambo' + ':' + 'soldier').toString('base64')
```

return base64 encode string `cmFtYm86c29sZGllcg==`

Using Basic Auth with Authorization Header set
```HTTP
curl -k -X GET -H "Authorization: Basic cmFtYm86c29sZGllcg==" "https://localhost:3000/api/v1/basicAuth"
```

returns following response
```json
{
  "credentials": {
    "username": "rambo",
    "password": "soldier"
  }
}
```
