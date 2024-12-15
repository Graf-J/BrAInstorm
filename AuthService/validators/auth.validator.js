const Joi = require('joi');
const createError = require('http-errors');


const validateRegisterBody = async (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(4).required(),
        password: Joi.string().min(6).required(),
        comparePassword: Joi.string().required().valid(Joi.ref('password'))
    });

    try {
        return await schema.validateAsync(data);
    } catch (error) {
        if (error.message === "\"comparePassword\" must be [ref:password]")  {
            throw createError.BadRequest('Passwords do not match.');
        } else if (error.message === "\"userName\" is required" || error.message === "\"userName\" is not allowed to be empty") {
            throw createError.BadRequest('Username is required.');
        } else if (error.message === "\"password\" is required" || error.message === "\"password\" is not allowed to be empty") {
            throw createError.BadRequest('Password is required.');
        } else if (error.message === "\"comparePassword\" is required" || error.message === "\"comparePassword\" is not allowed to be empty") {
            throw createError.BadRequest('Compare-Password is required.');
        } else if (error.message === "\"password\" length must be at least 6 characters long") {
            throw createError.BadRequest('Password must be at least 6 characters long.');
        } else if (error.message === "\"userName\" length must be at least 4 characters long") {
            throw createError.BadRequest('Username must be at least 4 characters long.');
        } else {
            console.log(error);
            throw createError.InternalServerError();
        }
    }
}

const validateLoginBody = async (data) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required(),
    });

    try {
        return await schema.validateAsync(data);
    } catch (error) {
        if (error.message === "\"userName\" is required" || error.message === "\"userName\" is not allowed to be empty") {
            throw createError.BadRequest('Username is required.');
        } else if (error.message === "\"password\" is required" || error.message === "\"password\" is not allowed to be empty") {
            throw createError.BadRequest('Password is required.');
        } else {
            console.log(error);
            throw createError.InternalServerError();
        }
    }
}

module.exports = {
    validateRegisterBody,
    validateLoginBody
}
