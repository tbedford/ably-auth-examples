// Runs HTTPS server with self-signed certificates for local testing
const https = require("https");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const options = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const key = process.env.API_KEY;
const ably = new require("ably").Rest(key);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/auth", (req, res) => {
  console.log("request method: " + req.method);
  console.log("username: " + req.headers["username"]);
  console.log("password: " + req.headers["password"]);

  const tokenParams = { ttl: 1000 * 60 * 2 }; // ttl ms
  ably.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
    if (err) {
      console.error("Bang");
      res
        .status(500)
        .send("Error requesting TokenRequest: " + JSON.stringify(err));
    } else {
      let timestamp = new Date().toLocaleString();
      console.log("TokenRequest issued at: " + timestamp);
      console.log(tokenRequest);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tokenRequest));
    }
  });
});

https.createServer(options, app).listen(443); // runs on port 443 for SSL
