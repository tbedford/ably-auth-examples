const ably = require("ably");

const realtime = ably.Realtime({
  authCallback: (tokenParams, callback) => {
    // implement your callback here
  },
});

realtime.connection.on("connecting", () => {
  console.log("Connecting to Ably...");
});

realtime.connection.on("connected", () => {
  console.log("Connected.");
});
