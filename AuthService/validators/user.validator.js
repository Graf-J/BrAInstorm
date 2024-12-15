const Joi = require('joi');
const createError = require('http-errors');

const validateGetUserBody = async (data) => {
    const schema = Joi.object({
        id: Joi.number().required()
    });

    try {
        return await schema.validateAsync(data);
    } catch (error) {
        if (error.message === "\"id\" is required" || error.message === "\"id\" is not allowed to be empty") {
            throw createError.BadRequest('Id is required.');
        } else {
            console.log(error);
            throw createError.InternalServerError();
        }
    }
}

module.exports = {
    validateGetUserBody
}
