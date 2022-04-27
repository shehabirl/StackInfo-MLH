import { User } from '../../resources/user/user.model';
import createError from 'http-errors';
import { userValidSchema } from '../validation_schemas/user_validation';
import {JWTAccessTokens as JAT} from '../jwthelpers';
import {redisClient} from '../redis/redisClient';
/**
 * 
400 Bad Request – This means that client-side input fails validation.
401 Unauthorized – This means the user isn’t not authorized to access a resource. It usually returns when the user isn’t authenticated.
403 Forbidden – This means the user is authenticated, but it’s not allowed to access a resource.
404 Not Found – This indicates that a resource is not found.
422 Unprocessable Entity - This means that there is a problem with the client side not the server side
500 Internal server error – This is a generic server error. It probably shouldn’t be thrown explicitly.
502 Bad Gateway – This indicates an invalid response from an upstream server.
503 Service Unavailable – This indicates that something unexpected happened on server side (It can be anything like server overload, some parts of the system failed, etc.).
 */


/**
 * -> function: ValidateRegister
 * -> parameters: req(request), res(response), next(next)
 * -> return type: void
 * -> description: asynchronous validating the request body if it matches the userValidSchema
 *  this is a part of the request level validation if there is an error inside the validation process,
 *  the error status is changed to 422; since it is not a problem with our server. Then checking if the validResult's
 *  email and username already existing, if either of them exist in our database, a Conflict error
 *  is thrown.
 *  After checking if user email or password,
 *  Access and Refresh tokens are generated inside the user createUser controller.
 * -> test cases(input,output):
 *      empty email
 *      empty password
 *      empty username
 *      empty email- password- username, does exist
 *      empty email- password- username, doesn't exist
 *      not empty email- password- username, does exist
 *      not empty email- password- username, doesn't exist
 *      not empty email- capital case- password, username, exist
 */

export const ValidateRegister = async (req, res, next) => {
    try {
        const validResult = await userValidSchema.validateAsync(req.body);
        const emailExists = await User.findOne({ email: validResult.email })
        const usernameExists = await User.findOne({username: validResult.username});
        if (emailExists) {
            throw new createError.Conflict(`${validResult.email} already exists!`)
        }
        else if(usernameExists)
        {
            throw new createError.Conflict(`${validResult.username} already exists!`)
        }
        //After validation, createUser controller is called
        else {
            next(validResult)
        }
    } catch (error) {
        console.log(error.name)
        if (error.isJoi) {
            error.status=422;
        }
        //passing error to the error handling middleware
        next(error)
    }
}

/**
 * function: ValidateLogin
 * parameters: req(request), res(response), next(next)
 * return type: void
 * description: asynchronous validating the request body if it matches the userValidSchema
 *  this is a part of the request level validation if there is an error inside the validation process,
 *  the error status is changed to 422; since it is not a problem with our server.
 *  After checking if user is registered and password matching,
 *  Access and Refresh tokens are generated.
 *  
 * test cases (inout, output):
 *      correct email- correct password, proceed with call stack
 *      incorrect email- correct password, Incorrect Email/Password!
 *      correct email- incorrect password, Incorrect Email/Password!
 *      incorrect email- incorrect password, Incorrect Email/Password!
 *      email-password- Joi error, Error 422
 */
export const ValidateLogin = async (req, res, next) => {
    try {
        const validResult = await userValidSchema.validateAsync(req.body);
        const user = await User.findOne({email:validResult.email});
        if(!user)
        {
            throw createError.NotFound('Incorrect Email/Password!');
        }
        const isPasswordMatches = await user.isValidPassword(validResult.password);
        console.log(isPasswordMatches)
        if(!isPasswordMatches)
        {
            throw createError.Unauthorized('Incorrect Email/Password!')
        }
        const accessToken = await JAT.SignAccessToken(user.id)
        const refreshToken = await JAT.SignRefreshToken(user.id)
        res.send({accessToken,refreshToken});
    } catch (error) {
        if(error.isJoi)
        {
            return next(createError.BadRequest("Invalid Username/Password"))
        }
        next(error)
    }
}
/**
 * function: HandleRefreshToken
 * parameters: req(request), res(response), next(next)
 * return type: void
 * description: The original refreshToken is extracted from the HTTP request body,
 * then after checking if it exists, we find the userID by the original refreshToken (refreshTokenReq)
 * and using this userID, we can re-generate new access Token and refreshToken (refreshTokenRes), then
 * send them both as a response
 * test cases (input,output):
 *      refreshTokenReq does not exist, Bad Request
 *      refreshTokenReq exists, userID exists, 200
 */
export const HandleRefreshToken = async(req,res,next) =>{
    try{
        //use const {refreshToken} = req.body incase of error from frontend
        const refreshTokenReq = req.body.refreshToken; //refresh token extracted from the request
        if(!refreshTokenReq)
        {
            throw createError.BadRequest()
        }
        //resolving the userID by verifying the refreshToken
        const userID = await JAT.VerifyRefreshToken(refreshTokenReq)
        const accessToken = await JAT.SignAccessToken(userID)
        const refreshTokenRes = await JAT.SignRefreshToken(userID) //refresh token regenerated to be sent in the response
        res.send({accessToken: accessToken, refreshToken: refreshTokenRes})
    }catch(error)
    {
        next(error)
    }
}
/**
 * function: ValidateAdmin
 * parameters: req(request), res(response), next(next)
 * return type: void
 * description: The userID is extracted from the audience field in the token's payload. Then we check if the userID exists
 * or not, if it doesn't exist we throw Unauthorized Error. Else, we check if the userRole corresponding to that userID
 * has value 'admin', if it doesn't has value 'admin', a forbidden error is thrown. Else, next middleware is called using next()
 * test cases (input,output):
 *      userID does not exist, Unauthorized
 *      userID exists - not 'admin', Forbidden
 *      userID exists - 'admin', continue the call stack
 */
export const ValidateAdmin = async(req,res,next)=>{
    try{
        const userID = req.payload.aud;
        if(!userID)
        {
            throw createError.Unauthorized();
        }
        const userQuery = await User.findById({_id:userID}, 'role').exec()
        const userRole = userQuery.role;
        if(userRole !== 'admin')
        {
            throw createError.Forbidden()
        }
        next()
    }catch(error){
        next(error)
    }
}

/**
 * function: Logout
 * parameters: req(request), res(response), next(next)
 * return type: void
 * description: refreshToken is extracted from the request body, then we check if it exists or not
 * if it does not exist, a BadRequest error is thrown. Else, we extract the userID from the refreshToken
 * and delete the userID key from Redis.
 * test cases (input, output):
 *      userID does not exist, BadRequest
 *      userID exists - Redis Error, InternalServerError
 *      userID exists - no Redis Error, response status 204
 */
export const Logout = async (req,res,next)=>{
    try {
        //use const {refreshToken} = req.body incase of error from frontend 
        const refreshToken = req.body.refreshToken;
        if(!refreshToken)
        {
            throw createError.BadRequest()
        }
        const userID = await JAT.VerifyRefreshToken(refreshToken)
        redisClient.DEL(userID, (err,val)=>{
            if(err)
            {
                console.log(err.message)
                throw createError.InternalServerError()
            }
            console.log(val)
            res.status(204).send()
        })
    } catch (error) {
        next(error)
    }
}
