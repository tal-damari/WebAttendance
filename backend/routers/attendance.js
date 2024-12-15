import { Router } from 'express';
import {getDate} from '../utils/date.js';
import {getTime} from '../utils/time.js';
import {userIn} from "./usersLogin.js";
import {usersInfo, initializeUsersInfo} from "../utils/fetchJsonUsers.js";
import fs from "fs/promises";

const router = new Router();
const filePath = './UsersInfo/users.JSON';

await initializeUsersInfo();

console.log(usersInfo);

//router that can get the date
router.get('/date', async (req, res) => {
    const currentDate = await getDate();
    if (currentDate) {
        res.status(200).send({ time: currentDate });
    } else {
        res.status(500).send({ message: 'Error fetching Date' });
    }
});

//router that can get the time
router.get('/time', async (req, res) => {
    const currentTime = await getTime();
    if (currentTime) {
        res.status(200).send({ time: currentTime });
    } else {
        res.status(500).send({ message: 'Error fetching Date' });
    }
})

router.get('/entranceExit', async (req, res) => {
    const currentDate = await getDate();
    const currentTime = await getTime();

    if (!currentTime || !currentDate || currentTime === 'null' || currentDate === 'null') {
        return res.status(500).send({message: 'Error fetching Data'});
    }

    for (let user of usersInfo) {
        if (user.username === userIn){
            user.attendance.push({ date: currentDate, time: currentTime });
        }
    }

    await fs.writeFile(filePath, JSON.stringify({ users: usersInfo }, null, 2), (err) => {
        if (err) {
            console.error("Error writing to JSON file:", err);
            return res.status(500).send({message: "Error saving data"});
        }
    });
    res.status(200).send({usersInfo});
});

export default router;
