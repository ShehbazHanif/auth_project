require('dotenv').config();

const express = require('express');

const dbConfig = require('./config/dbConfig');

const app = express();

dbConfig();

app.use(express.json());

const port = process.env.PORT || 3000;

const authRoute = require('./routes/authRoute');

const projectRoute = require('./routes/projectRoute');

const bidRoute = require('./routes/bidRoute');

app.use('/api/auth',authRoute);

app.use('/api/project',projectRoute);

app.use('/api/bid',bidRoute);

app.listen(port,()=>{
    console.log(`Server is live om: ${port}`)
});

