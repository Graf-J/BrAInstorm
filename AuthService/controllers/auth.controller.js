const createError = require('http-errors');
const { 
    generateJsonWebToken,
    readPublicKey,
    isPasswordValid
} = require('../services/auth.service');
const {
    getUserByUserName,
    createUser
} = require('../services/user.service');
const {
    validateRegisterBody,
    validateLoginBody
} = require('../validators/auth.validator');


const getPublicKey = (_req, res, _next) => {
    const publicKey = readPublicKey().toString();
    res.send({ publicKey });
}

const login = async (req, res, next) => {
    try {
        const { userName, password } = await validateLoginBody(req.body);

        const user = await getUserByUserName(userName);

        if (!user) throw createError.NotFound('User not found.');
        if (!await isPasswordValid(password, user.passwordHash)) throw createError.Conflict('Invalid Password.');

        const jwt = generateJsonWebToken(user.id);

        res.send({ jwt });
    } catch (error) {
        next(error);
    }
}

const register = async (req, res, next) => {
    try {
        const { userName, password } = await validateRegisterBody(req.body);

        const userId = await createUser(userName, password)
        const jwt = generateJsonWebToken(userId);

        res.send({ jwt });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPublicKey,
    login,
    register
}
