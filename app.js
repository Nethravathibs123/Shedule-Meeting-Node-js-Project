const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./util/database'); // Adjust the path if necessary
const meetingRoutes = require('./routes/meetingRoutes'); // Adjust the path if necessary
const errorController = require('./controllers/error'); // Make sure this controller is set up

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use your routes
app.use(meetingRoutes);

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
