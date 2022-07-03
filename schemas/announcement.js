const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Club = require('./club');

const AnnouncmentSchema = new Schema(
    {
        title: String,
        content: String,
        annDate: { type: Date, default: Date.now },
        lang: String,
        clubName: String /*[
            {
                type: Schema.Types.ObjectId,
                ref: 'club'
            }
        ]*/
    }
)

module.exports = mongoose.model('announcment', AnnouncmentSchema);
