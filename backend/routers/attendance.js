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

// every time a user wants to add a new status, they need to login and then add the status -> needs to run login enpoint and then this enpoint//
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

    try{
        await fs.writeFile(filePath, JSON.stringify({ users: usersInfo }, null, 2));
        res.status(200).send({usersInfo});
    }catch(err){
        console.log(err);
        return res.status(500).send({message: 'Error saving Data'});
    }
});

export default router;
