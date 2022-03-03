require("dotenv").config();
const Ably = require("ably");
const authUrl = "https://" + process.env.HOSTNAME + "/auth";
const authHeaders = { "User-Agent": "IoT client v0.2" };

const ably = new Ably.Realtime({
  authUrl: authUrl,
  authParams: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  authHeaders: authHeaders,
});

ably.connection.on("connecting", () => {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", () => {
  console.log("Connected");
});
