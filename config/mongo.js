require('dotenv').config()
// importe mongoose
const mongoose = require('mongoose');
// Data base url
const url = process.env.DB_CONNECTION_URL;


mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true});
const db = mongoose.connection;

db.on("connected", ()=>{
    console.log("mongodb connected");
});
db.on("error", (err)=>{
    console.log("mongodb connected error",err);
});
db.on("disconnected", ()=>{
    console.log("mongodb disconnected");
});

module.exports = db;