import { Router } from 'express'
import userControllers from '../../resources/user/user.controller';
import { ValidateRegister, ValidateLogin, HandleRefreshToken, Logout } from './auth.controller';
const router = Router();

// api/auth/register
router
    .route('/register').post(ValidateRegister, userControllers.createUser)

// api/auth/login
router
    .route('/login').post(ValidateLogin)

// api/auth/refresh-token
router
    .route('/refresh-token').post(HandleRefreshToken)

// api/auth/logout
router
    .route('/logout').delete(Logout)

export default router;