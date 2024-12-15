const createError = require('http-errors');
const {
    validateGetUserBody
} = require('../validators/user.validator');
const { 
    getUserById
} = require('../services/user.service');


const getUser = async (req, res, next) => {
    try {
        const { id } = await validateGetUserBody(req.params);

        const user = await getUserById(id);
        
        if (!user) throw createError.NotFound('User not found.');

        res.send({ userName: user.userName });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUser
}