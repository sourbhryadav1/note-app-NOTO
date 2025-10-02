import {Ratelimit} from "@upstash/ratelimit"; // for rate limiting
import {Redis} from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

// create a rate limiter that allows 100 req per minute
const ratelimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter : Ratelimit.slidingWindow(10, "10 s"),
});

export default ratelimit;