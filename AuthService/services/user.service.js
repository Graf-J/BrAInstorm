const createError = require('http-errors');
const { Prisma } = require('@prisma/client');
const prisma = require('../prisma/prismaClient');
const {
    hashPassword
} = require('./auth.service');


const getUserByUserName = async (userName) => {
    try {
        const user = await prisma.user.findFirst({
            where: { userName }
        })

        return user;
    } catch (error) {
        console.log(error);
        throw createError.InternalServerError();
    }
}

const getUserById = async (id) => {
    try {
        const user = await prisma.user.findFirst({
            where: { id }
        })

        return user;
    } catch (error) {
        console.log(error);
        throw createError.InternalServerError();
    }
}

const createUser = async (userName, password) => {
    try {
        const passwordHash = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                userName,
                passwordHash
            }
        });
    
        return user.id;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw createError.Conflict('Username already exists.');
        } else {
            console.log(error);
            throw createError.InternalServerError();
        }
    }
}

module.exports = {
    getUserById,
    getUserByUserName,
    createUser
}
