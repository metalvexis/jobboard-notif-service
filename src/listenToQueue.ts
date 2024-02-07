import amqplib from "amqplib";
import { notifyModerators } from "./notifyModerators";

export const listenToQueue = async (queue: string) => {
  if (!process.env.RABBITMQ_URL) {
    throw new Error("RABBITMQ_URL not found in env");
  }

  if (!process.env.JWT_MODS_SECRET) {
    throw new Error("JWT_MODS_SECRET not found in env");
  }

  const conn = await amqplib.connect(process.env.RABBITMQ_URL, {
    clientProperties: { connection_name: "JobBoardNotifService" },
  });

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue, {
    durable: true,
  });

  ch1.consume(queue, async (msg) => {
    if (!msg) return;

    await notifyModerators(msg);

    ch1.ack(msg);
  });

  console.log("listening to queue", queue);

  return conn;
};