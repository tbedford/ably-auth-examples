# Ably authentication

Project to demonstrate Ably authentication.

This project only features `TokenRequest` authentication, but shows different ways the client can handle this:

1. AuthUrl
2. AuthCallback

AuthUrl can be used by browser clients and IoT clients, but AuthCallback is typically used by IoT clients (browser clients can use
this method if there's a use case).

In this project Basic Authentication is used only on the (secured) server, and should generally be avoided on clients for security reasons (exposing the key).

This project is also designed to show use of `authMethod`, `authParams`, and `authHeaders` client options.

Note, this project only demonstrates authentication only, not subscribing, publishing etc. See Ably Time Server project for more in-depth info on that.

## Setting up the auth server on Glitch

Remix this project: 

https://glitch.com/edit/#!/mahogany-gusty-paint

You'll need to add your Ably API key to the project `.env file`.

The Glitch server code is also provided in `misc/server.js` for ease of reference.

## Configure the client

1. Copy `example.env` to `.env`.
2. Add a username and password - they can be anything - your auth server would validate these and connect to Ably only is authenticated.
3. Add your Glitch hostname to your .env file, for example:

```
HOSTNAME=mahogany-gusty-paint.glitch.me
USERNAME=username
PASSWORD=password
```

## Usage

Once the server is running, you can test it with:

```shell
curl https://mahogany-gusty-paint.glitch.me
```

This will return a simple HTML page. You'll need to change the hostname to match your hostname on Glitch.

You can then test the IoT client using `authCallback` with:

```shell
node client-callback.js
```

A response similar to the following will be returned:

```
Connecting to Ably...
statusCode: 200
{
  keyName: 'abcd.efgh',
  ttl: 120000,
  timestamp: 1646239363738,
  nonce: '9502769663000310',
  mac: 'Zu/CKaLarx4tAk1ui/12/SqDlx59ABx7v4fq+3Ras8c='
}
Time of token renewal: Wed Mar 02 2022 16:46:48 GMT+0000 (Greenwich Mean Time)
Connected
```

**NOTE: On the Glitch server, the TTL in the TokenRequest is set to the value of 2 minutes, for test purposes. In a real application you'll want to set a higher value to reduce load on your auth server.

You can test the IoT client using `authUrl` with:

```shell
node client-authurl.js
```
