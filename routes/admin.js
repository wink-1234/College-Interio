const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');

// router.get('/', function(req, res){
//     res.render('adminlogin');
// });
router.post('/add-student', adminController.addStudent);
router.post('/addAlumni', adminController.addAlumni);
router.post('/addCourse', adminController.addCourse);
router.post('/addOpportunity', adminController.addOpportunity);
router.get('/login', adminController.login);
router.get('/check', adminController.check)
// router.get('/login', function(req, res){
//     res.render('adminlogin');
// });

module.exports = router;
