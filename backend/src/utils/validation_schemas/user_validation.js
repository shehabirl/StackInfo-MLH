import Joi from 'joi';

export const userValidSchema = Joi.object({
    username: Joi.string().lowercase().trim(),
    password: Joi.string().min(12).max(15).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).trim().lowercase().required(),
    role: Joi.string().valid('user', 'admin'),
    description: Joi.string()
})

