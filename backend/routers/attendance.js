import { Router } from 'express';
import {getDate} from '../utils/date.js';
import {getTime} from '../utils/time.js';
import {userIn} from "./usersLogin.js";

const router = new Router();

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

router.get('/entrance', async (req, res) => {


})

export default router;
