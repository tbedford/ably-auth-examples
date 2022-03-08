require("dotenv").config();
const Ably = require("ably");
const authUrl = "https://" + process.env.HOSTNAME + "/auth";
const authHeaders = { "User-Agent": "IoT client v0.2" };

const realtime = new Ably.Realtime({
  authUrl: authUrl,
  authParams: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  authHeaders: authHeaders,
});

realtime.connection.on("connecting", () => {
  console.log("Connecting to Ably...");
});

realtime.connection.on("connected", () => {
  console.log("Connected");
});
