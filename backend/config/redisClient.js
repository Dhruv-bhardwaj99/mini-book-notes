const{createClient} = require("redis");
const redisClient = createClient({
    socket: {
        host: "localhost",
        port: 6380
    }
});

redisClient.on("error", (err) =>{
    console.error("Redis error:", err);
});

async function connectRedis() {
    if(!redisClient.isOpen){
        await redisClient.connect();
        console.log("Connected to Redis");
    }
    
}

module.exports = {
    redisClient,
    connectRedis,
}