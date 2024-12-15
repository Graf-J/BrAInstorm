const express = require('express');
const { 
    getPublicKey, 
    login, 
    register 
} = require('../controllers/auth.controller');

const router = express.Router();

router.get('/public-key', getPublicKey);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
