const {Event} = require('../schemas/event');
const {Announcement} = require('../schemas/announcement.js');
//const {success, error} = require('../models/response'); 
const Response = require('../models/apiResponse');

const displayEvents = async (req, res, next) => {
    try {
        console.log('This route has called')
        Event.find((err, data) => {
            if (err)
                res.json(Response.failure(`Error while getting event data: ${err.message}`));
            else
                res.json(Response.success(`Success`, data));
                console.log(data);
        });
    } catch (error) {
        res.json(Response.error(`Something went wrong while requesting events: ${error.mmessage}`));

    }
}

const displaySubscribedEvents = async (req, res, next) => {
    try {
        const allEvents = Event.find((err, data) => {
            if (err)
                res.json(Response.failure(`Error while getting event data: ${err.message}`));
            else
                res.json(Response.success(`Success`, data));

        })//hem eventler hem de onların clubId'leri gerekiyor
        //iki büyük db call yapıp uygulamayı yavaşlatmayacak bir çözüm bulunana kadar ertelenmiştir
        const userClubList = User.findById(req.body.userId).select(clubList);
        const subscribedEvents = [];
        for (clubEvent in allEvents) {
            if (userClubList.includes(clubEvent)) {
                subscribedEvents.push(clubEvent)
            }
        }
    } catch (error) {

    }
}

const displayAnnouncements = async (req, res, next) => {
    try {
        Announcement.find((err, data) => {
            if (err)
                res.json(Response.failure(`Error while getting announcement data: ${err.message}`));
            else
                res.json(Response.success(`Success`, data));

        })
    } catch (error) {
        res.json(Response.failure(`Something went wrong while requesting announcements: ${error.mmessage}`));
    }
}

const displayPendingList = (req, res, next) => {
    Event.findOne({ _id: req.params.eventId }, 'pendingList', (err, data) => {
        if (err)
            res.json(Response.failure(`Error while displaying pending list: ${err.message}`));
        else
            res.json(Response.success(`Success`, data));

    })
}

module.exports = { displayAnnouncements, displayEvents, displayPendingList };