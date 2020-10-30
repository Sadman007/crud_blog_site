const Joi = require('joi');

const UpdateSchema = Joi.object({
    id: Joi.number().integer().required(),
    content: Joi.string().min(1).max(1000).required()
})

const Schema = Joi.object({
    title: Joi.string().min(1).max(45).required(),
    username: Joi.string().min(1).max(45).required(),
    content: Joi.string().min(1).max(1000).required()
})

function validateData(req) {
    const result = Schema.validate(req.body);
    return result;
}

function validateDataForUpdate(req) {
    const result = UpdateSchema.validate(req.body);
    return result;
}

module.exports = {validateData, validateDataForUpdate};