const express = require('express');
const cors = require('cors');
// require('dotenv').config();

const app = express();

app.use(cors({
    origin: [process.env['WEBSITE_URL']]
}));
app.use(express.json());

app.use('/user', require('./routes/user.route'));
app.use('/auth', require('./routes/auth.route'));

app.use((error, _req, res, _next) => {
    res.status(error.status || 500).send({
        message: error.message || 'Internal Server Error'
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on Port ${ 3000 }`));
