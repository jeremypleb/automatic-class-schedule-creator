'use strict';

const path              = require('path')
const express           = require('express')
const bodyParser        = require('body-parser')
const EnforcerMiddleware = require('openapi-enforcer-middleware')


// ----- Set up the Express server -----
const app = express()

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send(`IT's ALIVE!!!`)
});

const swaggerPath = path.resolve(__dirname, './swagger.json')
const controllersPath =  path.resolve(__dirname, './src/controllers')

//create an enforcer instance
const enforcer = EnforcerMiddleware(swaggerPath)

/*//check for explicit mock request
enforcer.mocks({}, false).catch(console.error)*/

//call defined operation handlers
enforcer.controllers(controllersPath).catch(console.error)

/*//produce fallback mock responses
enforcer.mocks({}, true).catch(console.error)*/

//tell express to run the internal open api enforcer middleware
app.use(enforcer.middleware())

//add error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500)
})

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Beginning domain-test-claims-engine server");
    console.log("    [INFO] Server running on port: " + port);
    console.log("    [INFO] Controller path = " + path.resolve(__dirname, './controllers'));
    console.log("    [INFO] Swagger path = " + path.resolve(__dirname, './swagger.json'));
});