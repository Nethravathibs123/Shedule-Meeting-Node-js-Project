const { Sequelize } = require('sequelize');

// Create a Sequelize instance for connecting to the MySQL database
const sequelize = new Sequelize('meetingschedule', 'root', 'Nethra@1', {
    dialect: 'mysql',
    host: 'localhost'
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
