const express = require('express');
const router = express.Router();

const displayController = require('../controllers/displayController')
const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");
const announcementController = require('../controllers/announcementController');
const mailController = require("../controllers/mailController");

router.post('/admin/addEvent',  eventController.addEvent);

router.post('/admin/updateEvent', eventController.updateEvent);

router.post('/admin/deleteEvent', eventController.deleteEvent);

router.post('/admin/addAnnouncement', announcementController.addAnnouncement);

router.post('/admin/updateAnnouncement', announcementController.updateAnnouncement);

router.post('/admin/deleteAnnouncement', announcementController.deleteAnnouncement);

module.exports = router;