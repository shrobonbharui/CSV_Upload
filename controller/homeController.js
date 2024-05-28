const File = require('../models/csv');

module.exports.home = async function(req,res){
    try{
        let file = await File.find({});
        return res.render('home',{
            files: file,
            title: "Home"
        })

    }catch(error) {
        console.log('Error in homeController ', error);
        res.status(500).send('Internal server error');
    }
};