const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database'); // Adjust the path based on your structure

class Meeting extends Model {}

// Initialize the Meeting model
Meeting.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true, // Ensures valid email format
        },
    },
    time: {
        type: DataTypes.STRING, // Change to DATE if you want to handle date and time properly
        allowNull: false,
    },
}, {
    sequelize, // Pass the `sequelize` instance
    modelName: 'Meeting', // Model name
    tableName: 'meetings', // Optional: specify the table name in the database
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Export the Meeting model
module.exports = Meeting;
