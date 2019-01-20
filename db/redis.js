const redis = require("redis");
let redisClient;

const getRedisClient = () => {
    if (!redisClient) {
        redisClient = redis.createClient({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            name: process.env.REDIS_DB,
            password: process.env.REDIS_PASSWORD
        });
    }
    return redisClient
};


const getFromRedis = async (key) => {
       return await getRedisClient().get(key)
};


const setInRedis = async (key, data, expirationSecond) => {
        await getRedisClient().set(key, JSON.stringify(data), expirationSecond)
};


const removeFromRedis = async (key)=>{
       await getRedisClient().del(key)
};

const closeRedisConnection= ()=> {
    if (redisClient) {
        console.log('Close redis connection');
        redisClient.end(true);
        redisClient = null
    }
};