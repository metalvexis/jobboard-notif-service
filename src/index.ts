import { listenToQueue } from "./listenToQueue";
const QUEUE_NAME = process.env.NOTIF_QUEUE || "NOTIF_QUEUE";

(async () => {
  const conn = await listenToQueue(QUEUE_NAME);

  process.on("SIGINT", async () => {
    console.log("Received SIGINT. Closing connection");
    await conn.close();

    console.log("Connection closed");
  });
})();

// make node run without closing
