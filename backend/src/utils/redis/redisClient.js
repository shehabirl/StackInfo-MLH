import {createClient} from 'redis';
import createError from 'http-errors';

const COMPANY_QUERY_EXP = 60*60; //one hour
export const redisClient  = createClient({
    port: process.env.REDIS_PORT,
    host: process.env.HOST,
});
redisClient.on('connect', ()=>{
    console.log("Client connected to redis...")
})
redisClient.on('ready', ()=>{
    console.log("Client connected to redis and ready to use...")
})
redisClient.on('error', (err)=>{
    console.log(err.message)
})
redisClient.on('end', ()=>{
    console.log("Client disconnected from redis")
})
process.on('SIGINT',()=>{
    redisClient.quit()
})

/**
 * -> function: SetOrGetCompanyCache
 * -> parameters: key(String), callback(function)
 * -> return type: Promise
 * -> note: This function is called inside the request handler.
 * -> description: This function returns a Promise in which we first try to get 
 * data from redis client by calling get() method providing it (key) as an argument.
 * In case there is a redis error, we throw an Internal Server Error.
 * In case of data!= null (Cache hit), we resolve (return) the data in JSON form.
 * In case of Cache miss, we call the callback() function and the data returned from it
 * is then added to the redis cache memory using the setEx method providing the following arguments key, queryData in string form
 * and COMPANY_QUERY_EXP. Then, we resolve (return) the queryData.
 * -> test cases(input,output):
 *      Redis server down, Internal Server Error
 *      Redis server up - "company-page-1", Data in JSON Form (Cache hit. Must watch response time) 
 *      Redis server up - "company-page-1", Data in JSON Form (Cache miss. Must watch response time)
 */
export function SetOrGetCompanyCache (key, callback) {
    return new Promise((resolve, reject)=>{
        redisClient.get(key, async (error,data)=>{
            if(error)
            {
                return reject(createError.InternalServerError('Caching Error'))
            }
            //Cache hit
            if(data != null)
            {
                return resolve(JSON.parse(data))
            }
            //Cache miss
            //callback() --> MongoDB query
            const queryData = await callback();
            if(!queryData)
            {
                return reject(createError[404])
            }
            redisClient.setex(key,COMPANY_QUERY_EXP,JSON.stringify(queryData))
            resolve(queryData)
        })
    })
}
