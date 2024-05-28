const File = require('../models/csv');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

 // uplode csv file
 async function uplodeFile (req, res){
    try{

        // file is not present
        if(!req.file){
            return res.status(400).send('No files were uploaded.');
        }

        // file is not csv
        if(req.file.mimetype != "text/csv") {
            return res.status(400).send('Select CSV files only.');
        }

        let file = await File.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            file: req.filename
        });

        return res.redirect('/');

    }catch(error) {
        console.log('Error in fileController/uplode ', error);
        res.status(500).send('Internal server error');
    }
};


// EXPORTING FUNCTION To open file viewer page
async function fileView(req, res) {
    try {
        const isFile =  await File.findOne({file: req.params._id});
        const filesPath = isFile.filePath;
        const results = [];
        const header =[];
        fs.createReadStream(filesPath) //seeting up the path for file upload
        .pipe(csv())
        .on('headers', (headers) => {
            headers.map((head) => {
                header.push(head);
            });
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            res.render("file_view", {
                title: isFile.fileName,
                fileName: isFile.fileName,
                head: header,
                data: results,
                length: results.length
            });
        });
    }catch(error) {
        console.log('Error in fileController/delete ', error);
        res.status(500).send('Internal server error');
    }
};




// delete files
async function deleteFile (req, res){
    try{
        console.log(req.params);
        const isFile =  await File.findOne({file: req.params._id});
        const filesPath = isFile.filePath;
        // console.log(filesPath);
        if(isFile){
            await File.deleteOne(isFile);  
            fs.unlink(filesPath, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                  return res.status(500).json({ error: 'Error deleting file' });
                }
              
            });       
            return res.redirect("/");
        }else{
            console.log("File not found");
            return res.redirect("/");
        }

    }catch(error) {
        console.log('Error in fileController/delete ', error);
        res.status(500).send('Internal server error');
    }
};


module.exports = {uplodeFile, fileView, deleteFile};