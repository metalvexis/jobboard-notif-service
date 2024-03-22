import { listenToQueue } from "../listenToQueue";
import amqplib from "amqplib";

jest.mock("amqplib");
jest.mock("../notifyModerators");

describe("listenToQueue", () => {
  it("throws an error if RABBITMQ_URL is not set", async () => {
    process.env.JWT_MODS_SECRET = "secret";
    delete process.env.RABBITMQ_URL;
    await expect(listenToQueue("test")).rejects.toThrow(
      "RABBITMQ_URL not found in env"
    );
  });

  it("throws an error if JWT_MODS_SECRET is not set", async () => {
    process.env.RABBITMQ_URL = "amqp://localhost";
    delete process.env.JWT_MODS_SECRET;
    await expect(listenToQueue("test")).rejects.toThrow(
      "JWT_MODS_SECRET not found in env"
    );
  });

  it("connects to the RabbitMQ server", async () => {
    process.env.RABBITMQ_URL = "amqp://localhost";
    process.env.JWT_MODS_SECRET = "secret";

    await listenToQueue("test");
    expect(amqplib.connect).toHaveBeenCalledWith(process.env.RABBITMQ_URL, {
      clientProperties: { connection_name: "JobBoardNotifService" },
    });
  });
});
