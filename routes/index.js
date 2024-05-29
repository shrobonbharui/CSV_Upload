const express = require("express");
const router = express.Router();
const multer  = require('multer');


const upload = multer({ dest: 'uploads/files' });
const homeController = require('../controller/homeController');
const{uplodeFile, fileView, deleteFile} = require("../controller/fileController");

router.route("/").get(homeController.home);
router.route("/upload").post(upload.single('file'), uplodeFile);
router.route("/view/:id").get(fileView);
router.route("/delete/:id").get(deleteFile);

module.exports = router;