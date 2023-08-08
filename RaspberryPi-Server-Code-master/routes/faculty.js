const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty');
const facultyRequireLogin = require('../middlewares/facultyRequireLogin');

router.post('/facultysignup', facultyController.userRegister);
router.post('/facultysignin', facultyController.userLogin);
router.get('/facultymylabs', facultyRequireLogin, facultyController.myLabs);
router.post('/createLab', facultyRequireLogin, facultyController.createLab);
router.post('/getstudentsinlab', facultyController.studentsInfo);

router.post('/acceptstudentrequest', facultyRequireLogin, facultyController.acceptStudentJoinRequest);
router.post('/rejectstudentrequest',facultyRequireLogin,facultyController.rejectStudentJoinRequest);
router.post('/mynotification',facultyRequireLogin,facultyController.myNotification);
router.get('/allfaculties',facultyController.allFaculties);
module.exports = router;