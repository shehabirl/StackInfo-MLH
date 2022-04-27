import { User } from './user.model';
import { JWTAccessTokens } from '../../utils/jwthelpers';

const CreateAdmin = model => async (admin, req, res, next) => {
    try {
        if (admin instanceof Error) {
            next(admin)
        } else {
            const doc = await model.create({ ...req.body, role: 'admin' })
            const accessToken = await JWTAccessTokens.SignAccessToken(`${doc._id}`)
            const refreshToken = await JWTAccessTokens.SignRefreshToken(`${doc._id}`)
            res.status(201).json({ accessToken, refreshToken })
        }
    } catch (error) {
        next(error)
    }
}
const CreateUser = model => async (user, req, res, next) => {
    try {
        //Incase the object sent from the Authentication middleware is an error
        //proceed to the error handling middleware.
        if (user instanceof Error) {
            next(user)
        }
        else {
            const doc = await model.create({ ...req.body, role: 'user' })
            const accessToken = await JWTAccessTokens.SignAccessToken(`${doc._id}`)
            const refreshToken = await JWTAccessTokens.SignRefreshToken(`${doc._id}`)
            res.status(201).json({ accessToken, refreshToken })
        }
    } catch (error) {
        //passing error to the error handling middleware
        next(error)
    }
}
const GetUser = model => async (req, res) => {
    const id = req.params.id
    try {
        const doc = await model
            .findOne({ _id: id })
            .select('username description')
            .lean()
            .exec()
        if (!doc) {
            return res.status(404).end()
        }
        res.status(200).json({ data: doc })
    }
    catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
const UserControllers = model => ({
    createUser: CreateUser(model),
    createAdmin: CreateAdmin(model),
    getUser: GetUser(model)
})

export default UserControllers(User);