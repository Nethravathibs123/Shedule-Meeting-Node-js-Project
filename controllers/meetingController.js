const Meeting = require('../models/meetingModel');

exports.getSchedule = (req, res, next) => {
    // Fetch meetings from the database and render the view
    Meeting.findAll()
        .then(meetings => {
            res.render('meeting-schedule', { meetings: meetings });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
};

exports.postSchedule = (req, res, next) => {
    const { name, email, time } = req.body;
    // Create a new meeting entry
    Meeting.create({ name, email, time })
        .then(() => {
            res.redirect('/schedule'); // Redirect after scheduling
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
};

exports.deleteMeeting = (req, res, next) => {
    const meetingId = req.params.id;
    // Delete the meeting by ID
    Meeting.destroy({ where: { id: meetingId } })
        .then(() => {
            res.redirect('/schedule'); // Redirect after deletion
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
};
