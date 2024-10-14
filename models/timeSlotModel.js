const { Model, DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Ensure this path points to your Sequelize instance

class TimeSlot extends Model {}

TimeSlot.init({
    time: {
        type: DataTypes.STRING,
        allowNull: false, // Time slot cannot be null
    },
    availableCount: {
        type: DataTypes.INTEGER,
        allowNull: false, // availableCount cannot be null
        defaultValue: 0,  // Default value is 0 if not provided
    }
}, {
    sequelize,
    modelName: 'TimeSlot', // Name of the model
    tableName: 'time_slots', // Optional, ensures the table is called 'time_slots'
    timestamps: false,  
});

module.exports = TimeSlot;
