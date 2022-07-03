const { Event } = require('../schemas/event');
const { User } = require('../schemas/user');
const { success, error } = require('../models/response');
const { joinNotification } = require('../utils/notification');

//event'ten çıkma metodu ekle
//cronjob ile otomizasyon yap ya da firebase ile iptal etmeyi bul
//req, res model oluştur

const addEvent = async (req, res, next) => {
    try {
        const newEvent = await new Event({
            eventName: req.body.eventName,
            clubName: req.body.clubName,
            location: req.body.location,
            eventDate: req.body.eventDate,
            eventType: req.body.eventType,
            author: req.body.author
        });
        await newEvent.save((err, data) => {
            if (err)
                res.json(error(`Error while saving the event: ${err.message}`, 404));
            else
                res.json(success(`Event is successfully created!`, data));
        });
    } catch (error) {
        res.json(error(`Something went wrong while creating the event: ${error.message}`, 404));
    }
}

const getEventData = (eventId) => {
    try {
        const data = Event.findbyId(eventId);
        return data;
    } catch (error) {
        res.json(error(`${error.message}`, 404));
        return {};
    }
}

const joinEvent = (req, res, next) => {
    try {
        const data = getEventData(req.body.eventId);
        const eventType = data.eventType;
        //switch case has been used for different event types
        switch (eventType) {
            //in public case, user joins directly
            case 'Public':
                try {
                    Event.findByIdAndUpdate(req.body.eventId, {
                        $push: { attendenceList: req.body.userId }
                    }, (err, data) => {
                        if (err)
                            res.json(error(`Error while adding to the attendance list: ${err.message}`, 404));
                    });

                    User.findByIdAndUpdate(req.body.userId, { //transaction error handling için rollback ekle
                        $push: { eventList: req.body.eventId }
                    }, (err, data) => {
                        if (err)
                            res.json(error(`Error while adding to the event list: ${err.message}`, 404));
                    });

                    res.json(success(`Attendance is successfull!`, data));
                    joinNotification(data.eventDate, 3600000, token, data.eventName);
                    joinNotification(data.eventDate, 86400000, token, data.eventName);
                    joinNotification(data.eventDate, 604800000, token, data.eventName);

                } catch (error) {
                    res.json(error(`Something went wrong while adding the attendance: ${error.message}`, 404));
                }
                break;
            //in limited case, program first controls the capacity
            case 'Limited':
                const eventMaxAttendant = data.maxAttendant;
                const eventCurrentAttendant = data.attendanceList.length;

                //if capacity is full, user can not join
                if (eventCurrentAttendant + 1 > eventMaxAttendant)
                    res.json(error(`Event capacity is full!`)); //async await ekle
                else { //if it's not, user joins as if it's a public event
                    try {
                        Event.findByIdAndUpdate(req.body.eventId, {
                            $push: { attendenceList: req.body.userId }
                        }, (err, data) => {
                            if (err)
                                res.json(error(`Error while adding to the attendance list: ${err.message}`, 404));
                        });

                        User.findByIdAndUpdate(req.body.userId, {
                            $push: { eventList: req.body.eventId }
                        }, (err, data) => {
                            if (err)
                                res.json(error(`Error while adding to the event list: ${err.message}`, 404));
                        });

                        res.json(success(`Attendance is successfull!`, data));
                        joinNotification(data.eventDate, 3600000, token, data.eventName);
                        joinNotification(data.eventDate, 86400000, token, data.eventName);
                        joinNotification(data.eventDate, 604800000, token, data.eventName);
                    } catch (error) {
                        res.json(error(`Something went wrong while adding the attendance: ${error.message}`, 404));
                    }
                }
                break;
            //in private case, user requests approval to join, and is added to the pending list
            case 'Private':
                Event.findByIdAndUpdate(req.body.eventId, {
                    $push: { pendingList: req.body.userId }
                })
                    .then(res.json(success(`Attendance request has been made successfully. You will be noticed according to club executives' response.`, data)))
                    .catch(err => res.json(error(`Error while requesting attendance: ${err.message}`, 404)));
                break;
        }
    } catch (error) {
        res.json(error(`Something went wrong: ${error.message}`, 404));
    }
}

const updateEvent = (req, res, next) => {
    try {
        Event.findByIdAndUpdate(req.body.eventId, {
            eventName: req.body.eventName,
            clubName: req.body.clubName,
            location: req.body.location,
            eventDate: req.body.eventDate,
            eventType: req.body.eventType,
            author: req.body.author
        }, (err, data) => {
            if (err)
                res.json(error(`Error while updating event: ${err.message}`, 404));
            else
                res.json(success(`Event is successfully updated`, data));

        })
    } catch (error) {
        res.json(error(`Something went wrong while updating event: ${error.message}`, 404));
    }
}

const deleteEvent = (req, res, next) => {
    Event.remove(req.body.eventId, (err, data) => {
        if (err)
            res.json(error(`Error while deleting event: ${err.message}`, 404));
        else
            res.json(success(`Event is successfully deleted`, data));
    })
}

module.exports = { addEvent, joinEvent, updateEvent, deleteEvent };