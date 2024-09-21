import {Redis} from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: 6379,
    password: process.env.REDIS_PASSWORD || "mypassword"
})

export default redis;