require('dotenv').config();
const Sentry = require('@sentry/node');
const express = require('express');
const app = express();
const db = require("./db/mongoose-connection");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

// Because production environment support ssl we should scheme of swaggerData to https to can load that in production
if (process.env.NODE_ENVIRONMENT === 'production') {
    swaggerDocument.schemes = ['https'];
    Sentry.init({dsn: process.env.DSN_HEROCU});
}
Sentry.init({dsn: process.env.DSN_LOCAL});
console.log('swaggerDocument.schemes ', swaggerDocument.schemes);
db.init();
app.use(Sentry.Handlers.requestHandler());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/books', require('./routers/v1/bot/book'));
app.use('/api/v1/users', require('./routers/v1/bot/user'));
app.use('/api/v1/login', require('./routers/v1/bot/user'));
app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT, () => {
    console.log("Example app listening at http://%s:%s", process.env.PORT)
});

