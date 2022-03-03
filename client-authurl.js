require("dotenv").config();
const Ably = require("ably");
const auth_url = "https://" + process.env.HOSTNAME + "/auth";
const auth_headers = { "User-Agent": "IoT client v0.2" };

const ably = new Ably.Realtime({
  authUrl: auth_url,
  authParams: { username: process.env.USERNAME, password: process.env.PASSWORD },
  authHeaders: auth_headers,
});

ably.connection.on("connecting", () => {
  console.log("Connecting to Ably...");
});

ably.connection.on("connected", () => {
  console.log("Connected");
});
