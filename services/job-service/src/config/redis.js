import Redis from "ioredis";
import env from "./env.js";

const redisClient = new Redis(env.redisUrl);

redisClient.on("connect", () => {
  console.log("Job Service Redis connected");
});

redisClient.on("error", (error) => {
  console.error("Job Service Redis error", error.message);
});

export default redisClient;
