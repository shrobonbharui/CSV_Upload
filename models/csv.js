const mongoose = require('mongoose');


/** ------------------ MAKING schema ------------------ **/
const csvFileSchema = new mongoose.Schema({
    fileName:{
        type:String
    },
    filePath:{
        type:String
    },
    file:{
        type:String
    }
},{
    timestamps:{
        options: { timeZone: 'Asia/Kolkata' }
    }
});

/** ------------------ MAKING MODEL ------------------ **/
const files = mongoose.model("files", csvFileSchema);

/** ------------------ EXPORTING MODEL ------------------ **/
module.exports = files;