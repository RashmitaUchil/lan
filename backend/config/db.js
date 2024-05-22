const mongoose = require("mongoose");
const mongoUrl ="mongodb+srv://rashmitauchil20212:LangLearn@cluster0.zxjqrvl.mongodb.net/";
const InitiateMongoServer= async()=>{
    try
    {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true
        });
        console.log("Connected to Database!!");
    }
    catch(e)
    {
        console.log(e);
        throw e;
    }
};
module.exports= InitiateMongoServer;