var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
    console.log('connected');
});

export const setToken = (token, userId) => client.set(token, userId, 'EX', 5*60)


export const getToken = (token) => {
    return new Promise((resolve, reject) => {
        client.get(token, (err, userId) => {
            if(err)
                reject(err)
            
            if(!userId)
                return reject(new Error('token not found'))
    
            setToken(token, userId)
            
            resolve(userId)
            // return userId
        })
    })
    
}

export default client;