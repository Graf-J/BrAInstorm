const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const isPasswordValid = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

const generateJsonWebToken = (userId) => {
    const privateKey = readPrivateKey();
    const token = jwt.sign({ userId }, privateKey, {
        expiresIn: '1d',
        algorithm: 'RS512'
    });

    return token;
}

const readPrivateKey = () => {
    const privateKeyPath = path.join(__dirname, '..', 'certs', 'private.pem');
    const privateKey = fs.readFileSync(privateKeyPath);

    return privateKey;
}

const readPublicKey = () => {
    const publicKeyPath = path.join(__dirname, '..', 'certs', 'public.pem');
    const publicKey = fs.readFileSync(publicKeyPath);

    return publicKey;
}

module.exports = {
    hashPassword,
    isPasswordValid,
    generateJsonWebToken,
    readPublicKey
}
