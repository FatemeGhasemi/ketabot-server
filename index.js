const express = require('express');
const app = express();
require('dotenv').config();
const db = require("./db/mongoose-connection");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

db.initMongo();

app.use('/api/v1/books', require('./routers/v1/book'));
app.use('/api/v1/users', require('./routers/v1/user'));
app.listen(process.env.PORT, () => {
    console.log("Example app listening at http://%s:%s", process.env.PORT)
});

