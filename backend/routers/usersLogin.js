import { Router } from "express";
import {initializeUsersInfo} from "../utils/fetchJsonUsers.js";
import {usersInfo} from "../utils/fetchJsonUsers.js";

const router = new Router();
export let userIn;

await initializeUsersInfo();

//get check//
router.get('/', async (req, res) => {

    if (usersInfo) {
        res.status(200).send({ usersInfo });
    } else {
        res.status(500).send({ error: 'users info is unavailable' });
    }
});

//logging in with the user information//
router.post('/login', async (req, res) => {
    const {username,password } = req.body;
    userIn = username;
    for (let user of usersInfo) {
        if (user.username === username && user.password === password) {
            return res.status(200).send({ message: `You are logged in as ${user.username}` }); // Exit the function
        }
    }
    res.status(401).send({ message: `User is not created in the system` });
});

export default router;