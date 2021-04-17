// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`node server running on localhost: ${port}`);
};

//routes
app.get('/all', function (req, res) {
    res.send(projectData)
});

app.post('/weather', function (req, res) {
    console.log(req.body);
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feeling: req.body.content,
    }
    res.send(projectData);
})