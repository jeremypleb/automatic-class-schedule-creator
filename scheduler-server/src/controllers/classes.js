'using strict'

exports.getClasses = function (req, res) {
    console.log('entering getClasses()')
    res.send( { message: "getClass has been called."} )
}