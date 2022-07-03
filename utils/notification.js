const admin = require("firebase-admin");
const {CronJob} = require("cron");

const joinNotification = (eventDate, distance, token, eventName) => {
    notificationDateMs = eventDate.getMilliseconds() - distance;//in ms
    notificationDate = new Date(notificationDateMs);

    const distanceString = '';

    if(distance = 3600000){
        distanceString = '1 hour'
    }
    else if(distance = 86400000){
        distanceString = '1 day'
    }
    else if(distance = 604800000) {
        distanceString = '1 week'
    }

    const job = new CronJob(notificationDate, () => {
        //send notification to user via token
        admin.messaging().send({
            token: token,
            data: {
                eventName: eventName,
                eventDate: eventDate
            },
            android: {
                notification: {
                    body: `The event ${eventName} that you are joined is ${distanceString} away`,
                    title: `Upcoming Event!`
                }
            }
        })
    })
    job.start();
    
}

module.exports = joinNotification;