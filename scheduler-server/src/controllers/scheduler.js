'using strict'

import { Scheduler } from '../services/scheduler';

exports.createSchedules = function (req, res) {
    console.log('entering createSchedule()');

    const courseIds = [];
    const blockedTime; [];
    const dirPath = '../../../data/20195';

    // TODO we can format the validSchedules and send back the response as the client expects
    const scheduler = new Scheduler(courseIds, blockedTime, dirPath);
    const validSchedules = scheduler.generateSchedules(5);

    res.send({ 
        schedules: validSchedules
    });
}