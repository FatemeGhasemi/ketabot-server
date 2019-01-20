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

const closeRedisConnection = () => {
    if (redisClient) {
        console.log('Close redis connection');
        redisClient.end(true);
        redisClient = null
    }
};


const getFromRedis = (key) => {
    return new Promise((resolve, reject) => {
        getRedisClient().get(key, function (err, result) {
            if (err) {
                return reject(err)
            }
            console.log('----------Redis : ', JSON.parse(result))
            resolve(JSON.parse(result))
        })
    })
};


const setInRedis = (key, data, expirationSecond) => {
    return new Promise((resolve, reject) => {
        getRedisClient().set(key, JSON.stringify(data), 'EX', expirationSecond, function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
};


const removeFromRedis = (key) => {
    return new Promise((resolve, reject) => {
        getRedisClient().del(key, function (err, result) {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}

module.exports = {
    removeFromRedis,
    setInRedis,
    getFromRedis,
}