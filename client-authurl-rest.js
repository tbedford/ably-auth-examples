require("dotenv").config();
const Ably = require("ably");
const authUrl = "https://" + process.env.HOSTNAME + "/auth";
const authHeaders = { "User-Agent": "IoT client v0.2" };

console.log(authUrl);

const ably = new Ably.Rest({
  authUrl: authUrl,
  authParams: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  authHeaders: authHeaders,
  //log: { level: 4 }
});

const channel = ably.channels.get("ably-time-server");
channel.publish("message_label", "This is some data", () => {
  channel.history((err, resultPage) => {
    console.log("Last published message:" + resultPage.items[0]);
  });
});
