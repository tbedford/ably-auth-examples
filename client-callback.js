const https = require("https");
require("dotenv").config();

const options = {
  hostname: process.env.HOSTNAME,
  port: 443, // SSL
  path: "/auth",
  method: "GET",
  headers: {
    "User-Agent": "IoT client v0.2", // will fail on Glitch if you don't set this to something
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
};

const ably = new require("ably").Realtime({
  authCallback: (tokenParams, callback) => {
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      if (res.statusCode == 200) {
        res.on("data", (d) => {
          tokenRequest = d.toString();
          tokenRequest = JSON.parse(tokenRequest);
          console.log(tokenRequest);
          const time = new Date();
          console.log(`Time of token renewal: ${time}`);
          callback(null, tokenRequest);
        });
      } else {
        console.error("Response code was not 200.");
        callback(res.statusCode, null);
      }
    });

    // error making request
    req.on("error", (error) => {
      console.log("Something went bang...");
      console.error(error);
    });

    req.end();
  },
});

ably.connection.on("connecting", function () {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", function () {
  console.log("Connected");
});
