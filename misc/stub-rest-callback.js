const Ably = require("ably");

const rest = Ably.Rest({
  authCallback: (tokenParams, callback) => {
    // implement your callback here
  },
});

const channel = rest.channels.get("ably-time-server");
channel.publish("message_label", "This is some data", () => {
  channel.history((err, resultPage) => {
    console.log("Last published message:" + resultPage.items[0]);
  });
});
