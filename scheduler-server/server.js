'use strict';

const path              = require('path');
const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');
// const EnforcerMiddleware = require('openapi-enforcer-middleware');


// ----- Set up the Express server -----
const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get('/', function(req, res) {
//     res.send(`IT's ALIVE!!!`)
// });

// app.options('/getClass', cors())
// app.get('/getClass', function (req, res, next) {
//     console.log('entering getClass()')
//     //res.json({msg: 'This is CORS-enabled for all origins!'})
//     res.json( myJson )
//     console.log('exiting getClass()')
// })

// app.options('/postSchedule', cors())
// app.post('/postSchedule', function (req, res, next) {
//     console.log('entering postSchedule()')
//     console.log(req.body)
//     res.json({msg: 'This is CORS-enabled for all origins!'})
//     console.log('exiting postSchedule()')
// })

// const swaggerPath = path.resolve(__dirname, './swagger.json');
// const controllersPath =  path.resolve(__dirname, './src/controllers');

// //create an enforcer instance
// const enforcer = EnforcerMiddleware(swaggerPath);

// //check for explicit mock request
// enforcer.mocks({}, false).catch(console.error);

// //call defined operation handlers
// enforcer.controllers(controllersPath).catch(console.error);

// //produce fallback mock responses
// enforcer.mocks({}, true).catch(console.error);

// // tell express to run the internal open api enforcer middleware
// app.use(enforcer.middleware());
// app.use(enforcer.cors());

//add error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Beginning domain-test-claims-engine server");
    console.log("    [INFO] Server running on port: " + port);
    console.log("    [INFO] Controller path = " + path.resolve(__dirname, './controllers'));
    console.log("    [INFO] Swagger path = " + path.resolve(__dirname, './swagger.json'));
});

// var myJson = {
//     "classes": [
//         {
//             "classId": "CS142",
//             "department": "C S",
//             "courseNumber": "142",
//             "title": "Intro to Computer Programming",
//             "fullTitle": "Introduction to Computer Programming"
//         },
//         {
//             "classId": "CS224",
//             "department": "C S",
//             "courseNumber": "224",
//             "title": "Computer Systems",
//             "fullTitle": "Introduction to Computer Systems"
//         },
//         {
//             "classId": "CS235",
//             "department": "C S",
//             "courseNumber": "235",
//             "title": "Data Structures",
//             "fullTitle": "Data Structures and Algorithms"
//         },
//         {
//             "classId": "MATH102",
//             "department": "MATH",
//             "courseNumber": "102",
//             "title": "Quantitative Reasoning",
//             "fullTitle": "Quantitative Reasoning"
//         },
//         {
//             "classId": "MATH110",
//             "department": "MATH",
//             "courseNumber": "110",
//             "title": "College Algebra",
//             "fullTitle": "College Algebra"
//         },
//         {
//             "classId": "MATH111",
//             "department": "MATH",
//             "courseNumber": "111",
//             "title": "Trigonometry",
//             "fullTitle": "Trigonometry"
//         },
//         {
//             "classId": "SWELL105",
//             "department": "SWELL",
//             "courseNumber": "105",
//             "title": "Pickleball",
//             "fullTitle": "Pickleball"
//         }
//     ],
//     "10178-002": {
//         "year_term": "20195",
//         "curriculum_id": "10178",
//         "title_code": "002",
//         "dept_name": "C S",
//         "catalog_number": "224",
//         "catalog_suffix": null,
//         "title": "Computer Systems",
//         "full_title": "Introduction to Computer Systems.",
//         "sections": [
//             {
//                 "section_number": "001",
//                 "fixed_or_variable": "F",
//                 "credit_hours": "3.00",
//                 "minimum_credit_hours": "3.00",
//                 "honors": null,
//                 "credit_type": "S",
//                 "section_type": "DAY",
//                 "instructor_name": null,
//                 "instructor_id": null
//             },
//             {
//                 "section_number": "002",
//                 "fixed_or_variable": "F",
//                 "credit_hours": "3.00",
//                 "minimum_credit_hours": "3.00",
//                 "honors": null,
//                 "credit_type": "S",
//                 "section_type": "DAY",
//                 "instructor_name": null,
//                 "instructor_id": null
//             }
//         ]
//     }
// }
