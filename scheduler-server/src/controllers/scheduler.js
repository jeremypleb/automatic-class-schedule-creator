'using strict'

exports.createSchedules = function (req, res) {
    console.log('entering createSchedule()')
    res.send( {
        "class1": {
            "classId": "cs428",
            "classTitle": "Software Engineering",
            "days": ["M", "T", "W", "Th", "F"],
            "begin_time": "1400",
            "end_time": "1630",
            "building": "LSB",
            "credit_hours": "3.0"
        },
        "class2": {
            "classId": "cs330",
            "classTitle": "Programming Languages",
            "days": ["M", "W", "F"],
            "begin_time": "0900",
            "end_time": "0950",
            "building": "TMCB",
            "credit_hours": "3.0"
        },
        "class3": {
            "classId": "HIST101",
            "classTitle": "History Stuff",
            "days": ["T", "Th"],
            "begin_time": "1335",
            "end_time": "1450",
            "building": "JFSB",
            "credit_hours": "3.0"
        }
    } )
}

//TODO: implement a scheduler following the pseudo code below (first iteration w/ out time restraints)

// classMap = {} //each property of classMap will be an array with the classes available returned from the db
// for each desired class {
    // timesAvailable = 'select * from db.classes where classId = this.classId' //this may be abstracted
    // sort timesAvailable by begin_time
    // classMap[i] = sorted timesAvailable

// possibleSchedules = {}
// iterate through classMap
// take the earliest time from the first list, then the next earliest time after the last class end time for the rest.
// score final schedule based off number of back to back classes.
// (ex. if a schedule has 8 - 850, and 9-950, and all other classes are spread out. this would get a 2.)
// put arrays of possible schedules into possibleSchedules object - must have all classes in schedule



// ----- Mock Store -----

const classLibrary = {
    "CS224": {
        "year_term": "20195",
        "curriculum_id": "10178",
        "title_code": "002",
        "dept_name": "C S",
        "catalog_number": "224",
        "catalog_suffix": null,
        "title": "Computer Systems",
        "full_title": "Introduction to Computer Systems.",
        "sections": [
            {
                "section_number": "001",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            },
            {
                "section_number": "002",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            }
        ]
    },

    "CS428": {
        "year_term": "20195",
        "curriculum_id": "10178",
        "title_code": "002",
        "dept_name": "C S",
        "catalog_number": "224",
        "catalog_suffix": null,
        "title": "Computer Systems",
        "full_title": "Introduction to Computer Systems.",
        "sections": [
            {
                "section_number": "001",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            },
            {
                "section_number": "002",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            }
        ]
    },

    "CS330": {
        "year_term": "20195",
        "curriculum_id": "10178",
        "title_code": "002",
        "dept_name": "C S",
        "catalog_number": "224",
        "catalog_suffix": null,
        "title": "Computer Systems",
        "full_title": "Introduction to Computer Systems.",
        "sections": [
            {
                "section_number": "001",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            },
            {
                "section_number": "002",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            }
        ]
    },

    "HIST101": {
        "year_term": "20195",
        "curriculum_id": "10178",
        "title_code": "002",
        "dept_name": "C S",
        "catalog_number": "224",
        "catalog_suffix": null,
        "title": "Computer Systems",
        "full_title": "Introduction to Computer Systems.",
        "sections": [
            {
                "section_number": "001",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            },
            {
                "section_number": "002",
                "fixed_or_variable": "F",
                "credit_hours": "3.00",
                "minimum_credit_hours": "3.00",
                "honors": null,
                "credit_type": "S",
                "section_type": "DAY",
                "instructor_name": null,
                "instructor_id": null
            }
        ]
    },
}