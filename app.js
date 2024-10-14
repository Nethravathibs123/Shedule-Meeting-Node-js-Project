const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database'); // Adjust the path if necessary
const meetingRoutes = require('./routes/meetingRoutes'); // Adjust the path if necessary
const errorController = require('./controllers/error'); // Make sure this controller is set up

const app = express();
const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the meeting routes

app.use(meetingRoutes); // Adjust the base path as necessary
app.use(cors());

// Handle 404 errors
app.use(errorController.get404); // Make sure this function is defined to handle 404s

sequelize.sync()
    .then(result => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });
