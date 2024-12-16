import { Router } from "express";
import {initializeUsersInfo, usersInfo} from "../utils/fetchJsonUsers.js";
import fs from "fs/promises";

const filePath = './UsersInfo/users.JSON';
const router = new Router();

await initializeUsersInfo();

//get all users endpoint//
router.get("/getAllUsers", async (req, res) => {
    if(usersInfo) {
        res.status(200).send({message: "this are all users", usersInfo });
    }
    else
    {
        return res.status(500).send({ error: 'users info is unavailable' });
    }
});

//adding a new user endpoint//
router.post("/loadNewUser", async (req, res) => {
    const {username, password, role, attendance, email, phone} = req.body;
    usersInfo.push({username, password, role, attendance, email, phone});

    await fs.writeFile(filePath, JSON.stringify({users: usersInfo}, null,2), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send({error: 'users info is unavailable'});
        } else res.status(200).send({message: "new user added"})
    })
    res.status(200).send({message: `new user added`});
});

//change values in the wanted user//
//username should include a username from users.JSON, date as formated: 'yyyy-mm-dd', and time as formated: 'hh:mm'
router.post('/updateAttendance', async (req, res) => {
    const { username, oldDate, oldTime, newDate, newTime } = req.body;
    const user = usersInfo.find(user => user.username === username);

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const attendance = user.attendance.find(att => att.date === oldDate && att.time === oldTime);
    if (!attendance) {
        return res.status(404).send({ message: 'Attendance entry not found' });
    }

    attendance.date = newDate;
    attendance.time = newTime;

    // Save the updated usersInfo back to the JSON file
    try {
        await fs.writeFile(filePath, JSON.stringify({ users: usersInfo }, null, 2));
        res.status(200).send({ message: 'Attendance updated successfully', usersInfo });
    } catch (err) {
        console.error("Error writing to JSON file:", err);
        return res.status(500).send({ message: 'Error saving data' });
    }
});

router.post('/deleteAttendance', async (req, res) => {
    const { username, oldDate, oldTime } = req.body;
    const user = usersInfo.find(user => user.username === username);

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const attendance = user.attendance.find(att => att.date === oldDate && att.time === oldTime);

    if (!attendance) {
        return res.status(404).send({ message: 'Attendance entry not found' });
    }

    user.attendance.splice(attendance, 1);

    try {
        await fs.writeFile(filePath, JSON.stringify({ users: usersInfo }, null, 2));
        res.status(200).send({ message: 'Attendance deleted successfully' });
    } catch (err) {
        console.error("Error writing to JSON file:", err);
        return res.status(500).send({ message: 'Error saving data' });
    }

})

export default router;