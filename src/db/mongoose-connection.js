const mongoose = require('mongoose');
let mongoUrl ="mongodb://"
if (process.env.MONGO_USERNAME) {
    mongoUrl+= process.env.MONGO_USERNAME+":"+ process.env.MONGO_PASSWORD+"@"+process.env.MONGO_HOST+":"+process.env.MONGO_PORT+"/"+process.env.MONGO_DB_NAME;
}else{
    mongoUrl+= process.env.MONGO_HOST+":"+process.env.MONGO_PORT+"/"+process.env.MONGO_DB_NAME;
    console.log('mongoUrl: ',mongoUrl)
}
const init = () => {
    console.log("mongoUrl:",mongoUrl);
    mongoose.connect(mongoUrl,{useNewUrlParser:true});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error...'));
    db.once('open', function () {
        console.log('db opened...');
    });
};

module.exports = {
     init
}