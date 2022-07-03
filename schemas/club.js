const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Announcement = require('./announcement');
//const Event = require('./event');

const ClubSchema = new Schema(
    {
        clubname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        clubExc: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        announcment: [
            {
                type: Schema.Types.ObjectId,
                ref: 'announcment'
            }
        ],
        event: [
            {
                type: Schema.Types.ObjectId,
                ref: 'event'
            }
        ],
        subscriberList: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        bio: String,
        avatar: String
    }
)

module.exports = mongoose.model('club', ClubSchema);
