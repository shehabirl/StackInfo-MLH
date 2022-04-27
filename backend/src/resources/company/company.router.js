import { Router } from 'express'
import controllers from './company.controller'
import { ValidateCompany,ValidateCompanyPUT } from '../../utils/validation_schemas/company_validation'
import {JWTAccessTokens as JAT} from '../../utils/jwthelpers'
import { ValidateAdmin } from '../../utils/auth/auth.controller'
const router = Router()
// /api/companies
router
    .route('/')
    //verifyAccessToken(authenticate), make sure it is admin authorized, validate the company schema, then create a company
    //verifyAccessToken, find the userID based on the access token, find the user role based on the userID, if it is admin then proceed
    //else throw Unauthorized error,
    .post(JAT.VerifyAccessToken,ValidateAdmin,ValidateCompany,controllers.createCompany)
    .get(controllers.getByPriority)

    // /api/companies/name/:slug
router
.route('/name/:slug?')
.get(controllers.getByName)

// /api/companies/:id
router
    .route('/:id')
    .put(JAT.VerifyAccessToken,ValidateAdmin,controllers.updateOne)
    .delete(JAT.VerifyAccessToken,ValidateAdmin,controllers.removeOne)
    .get(controllers.getOne)




// /api/companies/companies
// I don't really understand why /companies only doesn't work
// so we are keeping it like that until I figure it out
router
    .route('/companies/stacks')
    .get(controllers.getByStack)

export default router;