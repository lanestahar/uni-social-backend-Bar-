const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Club = require('./club');

const EventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    clubName: [
        //For testing purposes, I converted this attribute into a String
        /*{ 
            type: Schema.Types.ObjectId,
            ref: 'club'
        }*/
        String
    ],
    clubId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'club'
        }
    ],
    location: String,
    eventDate: { type: Date, default: Date.now },
    eventType: String,
    capacity: Number,
    author: 
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    joinedList: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
    attendenceList: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }    
    ],
    pendingList: [
        {
         type: Schema.Types.ObjectId,
         ref: 'User'
        }
    ]
})

module.exports = mongoose.model('event', EventSchema);
