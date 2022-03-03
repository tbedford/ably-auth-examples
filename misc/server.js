// You can remix this project: https://glitch.com/edit/#!/mahogany-gusty-paint
// Glitch will give you a server hosted on https - so is more secure than running locally on http.
// require('dotenv').config(); // Glitch loads environment for you, if attempting to test locally uncomment load dotenv 
const express = require("express");
const bodyParser = require("body-parser");

const key = process.env.API_KEY;
const ably = new require("ably").Rest(key);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

function printHeaders(req) {
  if (req.headers != null) {
    for (let h in req.headers) {
      console.log("Header: " + h + " -- " + req.headers[h]);
    }
  }
}

function printParams(req) {
  if (req.query != null) {
    for (let p in req.query) {
      console.log("Param: " + p + " -- " + req.query[p]);
    }
  }
}

function authHandler(req, res) {
  console.log("request method: " + req.method);

  printHeaders(req);
  printParams(req);

  const tokenParams = { ttl: 1000 * 60 * 2 }; // ttl ms - 2 minutes
  ably.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
    if (err) {
      console.error("Bang");
      res
        .status(500)
        .send("Error requesting TokenRequest: " + JSON.stringify(err));
    } else {
      const timestamp = new Date().toLocaleString();
      console.log("TokenRequest issued at: " + timestamp);
      console.log(tokenRequest);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tokenRequest));
    }
  });
}

app.get("/auth", authHandler);
app.post("/auth", authHandler);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port --> " + listener.address().port);
});
