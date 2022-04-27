import Joi from 'joi';
import { Company } from '../../resources/company/company.model';
import createError from 'http-errors';

export const companyValidSchema = Joi.object({
    name: Joi.string().trim().required(),
    logoBackground: Joi.string().trim().required(),
    logo: Joi.string().trim(),
    url: Joi.string().uri().trim().required(),
    stacks: Joi.array().items(Joi.string().allow('')),
    progLangs: Joi.array().items(Joi.string().allow('')),
    frontend: Joi.array().items(Joi.string().allow('')),
    backend: Joi.array().items(Joi.string().allow('')),
    isHiring: Joi.boolean(),
    offerInternships: Joi.boolean(),
    p: Joi.number().integer().min(0),
    location: Joi.object({
        country: Joi.string(),
        state: Joi.string(),
        address: Joi.string()
    })


})
export const ValidateCompany = async (req, res, next) => {
    try {
        const validResult = await companyValidSchema.validateAsync(req.body);
        const doesExist = await Company.findOne({ name: validResult.name })
        if (doesExist) {
            throw new createError.Conflict(`${validResult.name} is already exists!`)
        }
        else {
            next(validResult)
        }
    } catch (error) {
        //In order to avoid 500 status since it is not a problem with the server side
        if (error.isJoi === true) {
            error.status = 422;
        }
        //passing error to the error handling middleware
        next(error)
    }
}
export const ValidateCompanyPUT = async (req, res, next) => {
    try {
        const validResult = await companyValidSchema.validateAsync(req.body);
        const doesExist = await Company.findOne({ name: validResult.name })
        if (!doesExist) {
            throw new createError.Conflict(`${validResult.name} does not exist!`)
        }
        else {
            next(validResult)
        }
    } catch (error) {
        //In order to avoid 500 status since it is not a problem with the server side
        if (error.isJoi === true) {
            error.status = 422;
        }
        //passing error to the error handling middleware
        next(error)
    }
}