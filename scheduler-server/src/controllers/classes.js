'using strict'

exports.getClasses = function (req, res) {
    console.log('entering getClasses()')
    res.send(getClasses)
}

// ----- Mock Store -----

const getClasses = {
    'classes': {
        'list': [
            {
                "classId": "CS224",
                "department": "C S",
                "courseNumber": "224",
                "title": "Computer Systems",
                "fullTitle": "Introduction to Computer Systems"
            },
            {
                "classId": "CS428",
                "department": "C S",
                "courseNumber": "428",
                "classTitle": "Software Engineering",
                "fullTitle": "Principles of Software Engineering"
            },
            {
                "classId": "CS330",
                "department": "C S",
                "courseNumber": "330",
                "classTitle": "Programming Languages",
                "fullTitle": "Concepts of Programming Languages"
            },
            {
                "classId": "HIST101",
                "department": "HIST",
                "courseNumber": "101",
                "classTitle": "Guns, Germs, and Steel",
                "fullTitle": "History of Guns, Germs, and Steel"
            }
        ]
    }
}