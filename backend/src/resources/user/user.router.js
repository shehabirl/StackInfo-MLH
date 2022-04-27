import controllers from './user.controller';
import { Router } from 'express'
import { ValidateRegister } from '../../utils/auth/auth.controller';
const router = Router()

// api/users/:id    
router
    .route('/:id')
    .get(controllers.getUser)

// api/users/admins
router
    .route('/admins')
    .post(ValidateRegister,controllers.createAdmin)
export default router;