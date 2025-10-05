import { Ratelimit } from "@upstash/ratelimit"; // for rate limiting
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Gracefully disable rate limiting if Upstash env vars are not provided
const hasUpstash = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

let ratelimit;
if (hasUpstash) {
    // real limiter: 100 req per 60s
    ratelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(100, "60 s"),
    });
} else {
    // no-op limiter: always allow
    ratelimit = {
        limit: async () => ({ success: true, reset: 0, remaining: 1 })
    };
}

export default ratelimit;