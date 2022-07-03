const {Announcement} = require('../schemas/announcement');
const { success, error } = require('../models/response.js');

const addAnnouncement = async (req, res, next) => {
    try {
        const newAnnoucnement = await new Announcement({
            title: req.body.title,
            content: req.body.content,
            annDate: req.body.annDate,
            lang: req.body.lang,
            clubName: req.body.clubName
        });
        await newAnnoucnement.save((err, data) => {
            if (err)
                res.json(error(`Error while saving announcement: ${err.message}`, 404));
            else
                res.json(success(`Announcement is successfully saved`, data));
        })
    } catch (error) {
        res.json(error(`Something went wrong while creating announcement: ${error.message}`, 404));
    }
}

const updateAnnouncement = (req, res, next) => {
    try {
        Announcement.findByIdAndUpdate(req.body.announcementId, {
            title: req.body.title,
            content: req.body.content,
            annDate: req.body.annDate,
            lang: req.body.lang,
            clubName: req.body.clubName
        }, (err, data) => {
            if (err)
                res.json(error(`Error while updating announcement: ${err.message}`, 404));
            else
                res.json(success(`Announcement is successfully updated`, data));
        })
    } catch (error) {
        res.json(error(`Something went wrong while updating announcement: ${err.message}`, 404));
    }

}

const deleteAnnouncement = (req, res, next) => {
    Announcement.remove(req.body.announcementId, (err, data) => {
        if (err)
            res.json(error(`Error while deleting announcement: ${err.message}`, 404));
        else 
            res.json(success(`Announcement is successfully deleted`, data));
    })
}

module.exports = { addAnnouncement, updateAnnouncement, deleteAnnouncement };