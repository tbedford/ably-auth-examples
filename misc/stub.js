const https = require("https");
require("dotenv").config();
const ably = require("ably");

const options = {
    hostname: process.env.HOSTNAME,
    port: 443, // SSL
    path: "/auth",
    method: "POST",
    headers: {
      "User-Agent": "IoT client v0.2", // will fail on Glitch if you don't set this to something
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  };
  
const realtime = ably.Realtime({
  authCallback: (tokenParams, callback) => {
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      if (res.statusCode == 200) {
        res.on("data", (tokenRequest) => {
          console.log('TokenRequest: --->' + tokenRequest);
          const time = new Date();
          console.log(`Time of token renewal: ${time}`);
          callback(null, JSON.parse(tokenRequest));
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

realtime.connection.on("connecting", () => {
  console.log("Connecting to Ably...");
});

realtime.connection.on("connected", () => {
  console.log("Connected");
});
