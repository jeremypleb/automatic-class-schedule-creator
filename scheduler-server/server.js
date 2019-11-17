// libraries
const path              = require('path');
const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');

// services
const Scheduler = require("./src/services/scheduler");
const Utility = require("./src/services/utility");

const utility = new Utility();

// ----- Set up the Express server -----
const app = express();

// middleware for cors and serializing json
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for logging requests
app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;

    console.log(`Making Request: ${method} ${url}`);

    next();
});

// returns list of all classes
app.get('/classes', function (req, res, next) {
    const classes = utility.loadJson('../data/classes.json');

    if (!!classes) {
        console.log("   Success");
        res.json(classes);
    } else {
        console.log("   Failure");
        res.sendStatus(500);
    }

    next();
});

// generates schedules according to the given data and returns them
app.post('/scheduler', function (req, res, next) {
    console.log(req.body);

    let { semester, courseIds, blockedTime } = req.body;
    const dirPath = `../data/${semester}`;

    // the files don't have the 'R' at the end, so we need to remove it if present
    courseIds = courseIds.map((courseId) => {
      if (courseId.slice(-1) === 'R') {
        return courseId.slice(0,-1);
      } else {
        return courseId;
      }
    });
    
    // TODO we can format the validSchedules and send back the response as the client expects
    const scheduler = new Scheduler(courseIds, blockedTime, dirPath);
    const validSchedules = scheduler.generateSchedules(1000);

    const schedulesToSend = validSchedules.splice(0, 3);

    res.json({ schedules: schedulesToSend });

    next();
});

app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;

    console.log(`End Request: ${method} ${url}`);

    next();
});

//add error handling middleware
app.use((err, req, res, next) => {
    console.log(err);

    res.sendStatus(500);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});