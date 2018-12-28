const express = require('express');
const app = express();
require('dotenv').config();
const bookRouter = require('./routers/v1/book');
const userRouter = require('./routers/v1/user');
const db = require("./db/mongoose-connection");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

db.initMongo();

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);
const server = app.listen(process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)
});

