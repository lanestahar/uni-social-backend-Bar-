const express = require('express');
const router = express.Router();

const displayController = require('../controllers/displayController')
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const announcementController = require('../controllers/announcementController');
const mailController = require("../controllers/mailController");
//import subscribeController from '../controllers/subscribeController.js';


router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/admin/addEvent',  eventController.addEvent);

router.post('/admin/updateEvent', eventController.updateEvent);

router.post('/join', eventController.joinEvent);

router.post('/admin/deleteEvent', eventController.deleteEvent);

router.post('/admin/addAnnouncement', announcementController.addAnnouncement);

router.post('/admin/updateAnnouncement', announcementController.updateAnnouncement);

router.post('/admin/deleteAnnouncement', announcementController.deleteAnnouncement);

router.post('/contact', mailController.contactMail);

//router.post('/subscribe', subscribeController.subscribeClub);

router.get('/newRoute', (req, res, next) => {
    console.log('This is a new route')
})

router.get('/events', (req, res, next) => {
    console.log('This route called from router')
    res.json({message: 'This route called from router'})}, displayController.displayEvents);

router.get('/announcements', displayController.displayAnnouncements);

router.get('/pendingList', displayController.displayPendingList);

module.exports = router;