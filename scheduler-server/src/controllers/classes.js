'using strict'

exports.getClasses = function (req, res) {
    console.log('entering getClasses()')
    res.send( {
        "classes": {
            "list": [
                {
                    "classId": "cs428",
                    "classTitle": "Software Engineering"
                },
                {
                    "classId": "cs330",
                    "classTitle": "Concepts of Programming Languages"
                },
                {
                    "classId": "HIST101",
                    "classTitle": "Guns, Germs, and Steal"
                }
            ]
        }
    } )
}