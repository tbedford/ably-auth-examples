// You can remix this project: https://glitch.com/edit/#!/mahogany-gusty-paint
// Glitch will give you a server hosted on https - so is more secure than running locally on http.
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()

const key = process.env.API_KEY;
const ably = new require("ably").Rest(key);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/auth", (req, res) => {
  
  console.log('request method: ' + req.method);
  console.log('username: ' + req.headers["username"]);
  console.log('password: ' + req.headers["password"]);
  
  const tokenParams = { ttl: 1000 * 60 * 2}; // ttl ms 
  ably.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
    if (err) {
      console.error("Bang");
      res.status(500).send("Error requesting TokenRequest: " + JSON.stringify(err));
    } else {
      let timestamp = new Date().toLocaleString();
      console.log('TokenRequest issued at: ' + timestamp)
      console.log(tokenRequest);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tokenRequest));
    }
  });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

