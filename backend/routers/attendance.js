import { Router } from 'express';
import {getDate} from '../utils/date.js';
import {getTime} from '../utils/time.js';
import {userIn} from "./usersLogin.js";
import {usersInfo, initializeUsersInfo} from "../utils/fetchJsonUsers.js";
import {addEntranceExit} from "../utils/addEntranceExit.js";
const router = new Router();

await initializeUsersInfo();

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


//TODO fix the entrance//
router.get('/entrance', async (req, res) => {
    const currentDate = await getDate();
    const currentTime = await getTime();

    if (!currentTime || !currentDate || currentTime === 'null' || currentDate === 'null') {
        return res.status(500).send({message: 'Error fetching Data'});
    }

    res.status(200).send({message: "current date: "+currentDate + "current time: "+currentTime});
});

export default router;
