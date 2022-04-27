import createError from 'http-errors';
import JWT from 'jsonwebtoken';
import {redisClient} from './redis/redisClient';

//If you modified JWT_REFRESH_EXPIRATION, you should also modify this
const EX_REDIS= 365*24*60*60;
//Include user role inside the payload later to decrease database calls during authorization
export const JWTAccessTokens = {
    SignAccessToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: process.env.JWT_NAME,
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: process.env.JWT_ACCESS_EXPIRATION,
                issuer: process.env.JWT_ISSUER,
                audience: userID
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    return reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },
    VerifyAccessToken: (req,res,next)=>{
        if(!req.headers['authorization'])
        {
            return next(createError.Unauthorized('Request unauthorized - No token present'))
        }
        const bearerToken = req.headers['authorization'].split(' ')[1];
        JWT.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
            if(err)
            {
                console.log(`JWT Error`)
                const errorMessage =  err.name ==='JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(errorMessage));
            }
            req.payload = payload;
            next()
        })
    },
    SignRefreshToken: (userID) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: process.env.JWT_NAME,
            }
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options = {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION,
                issuer: process.env.JWT_ISSUER,
                audience: userID
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    return reject(createError.InternalServerError())
                }
                //Setting userID as key and refreshToken as value in Redis
                redisClient.set(`user: ${userID}`,token,'EX',EX_REDIS, (err,reply)=>{
                    if(err)
                    {
                        console.log(err.message)
                        return reject(createError.InternalServerError())
                    }
                    resolve(token)
                })
            })
        })
    },
    VerifyRefreshToken: (refreshToken)=>{
        return new Promise((resolve,reject)=>{
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
                if(err)
                {
                    return reject(createError.Unauthorized())
                }
                const userID = payload.aud
                //Checking cached refresh Token in Redis
                redisClient.get(`user: ${userID}`, (err,result)=>{
                    if(err)
                    {
                        return reject(createError.InternalServerError())
                    }
                    if(result === refreshToken)
                    {
                        return resolve(userID)
                    }
                    else{
                        return reject(createError.Unauthorized())
                    }
                })
            })
        })
    }
}