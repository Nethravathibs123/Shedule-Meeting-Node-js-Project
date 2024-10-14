const Meeting = require('../models/meetingModel');
const TimeSlot = require('../models/timeSlotModel'); // Make sure this path is correct

// Function to generate a random Google Meet link
function generateRandomMeetLink() {
    const randomString = Math.random().toString(36).substring(2, 8) + '-' + 
                         Math.random().toString(36).substring(2, 8) + '-' + 
                         Math.random().toString(36).substring(2, 8);
    return `https://meet.google.com/${randomString}`;
}


exports.getSchedule = async (req, res, next) => {
    try {
        const meetings = await Meeting.findAll();
        const timeSlots = await TimeSlot.findAll();
        res.render('meeting-schedule', { meetings: meetings, timeSlots: timeSlots });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.postSchedule = async (req, res, next) => {
    const { name, email, time } = req.body;
    const meetingLink = generateRandomMeetLink(); // Use the function to generate a Google Meet link

    try {
        // Find the time slot
        const timeSlot = await TimeSlot.findOne({ where: { time } });

        if (timeSlot && timeSlot.availableCount > 0) {
            // Decrement available count
            timeSlot.availableCount -= 1;
            await timeSlot.save();

            // Create a new meeting record with the Google Meet link
            const newMeeting = await Meeting.create({ name, email, time, meetingLink });

            // Return updated time slot info along with the generated meeting link
            res.json({ availableCount: timeSlot.availableCount, meetingLink });
        } else {
            res.status(400).json({ error: 'No available slots for this time.' });
        }
    } catch (error) {
        console.error('Error scheduling meeting:', error);
        res.status(500).send('Server Error');
    }
};

exports.deleteMeeting = async (req, res, next) => {
    const meetingId = req.params.id;

    try {
        // Find the meeting to determine the time slot
        const meeting = await Meeting.findByPk(meetingId);

        if (!meeting) {
            return res.status(404).send("Meeting not found");
        }

        // Increment available count for the corresponding time slot
        await TimeSlot.increment('availableCount', {
            where: { time: meeting.time }
        });

        // Delete the meeting by ID
        await Meeting.destroy({ where: { id: meetingId } });

        res.redirect('/schedule'); // Redirect after deletion
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
