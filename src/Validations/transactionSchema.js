import Joi from 'joi';

const transactionSchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('income','expense')
})

export default transactionSchema;