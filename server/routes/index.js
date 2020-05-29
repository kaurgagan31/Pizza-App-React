const { Router } = require('express');
const router = Router();
const connect= require('../middleware/connect');
const users = require('../controllers/users');
const path = require("path");
const multer = require("multer");
router.use(connect);

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("file");

 router.route('/log_in')
 .post(users.logIn);
router.post('/saveFormData', upload, users.saveFormData);
router.get('/getUsers', users.getUserData);
router.post('/searchUsers', users.searchUser);

module.exports = router;  

