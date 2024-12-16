import { Router } from "express";
import {fileReader} from "../utils/fileReaderAdmin.js";

const router = new Router();

let adminInfo;

//asynchronous function to get admin information from the async function fileReader
const initializeAdminInfo = async () => {
    try {
        adminInfo = await fileReader();
        /*console.log('Admin Info loaded:', adminInfo)*/;
    } catch (error) {
        console.error('Failed to load Admin Info:', error);
    }
};

await initializeAdminInfo();

//get check
router.get('/', async (req, res) => {
    if (adminInfo) {
        const username = adminInfo.username;
        res.status(200).send({ username });
    } else {
        res.status(500).send({ error: 'Admin info is unavailable' });
    }
});

//user logging in with the values given in req.body
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if(adminInfo){
        const adminUsername = adminInfo.username;
        const adminPassword = adminInfo.password;
        if(adminUsername === username && adminPassword === password){
            res.status(200).send({message: `You are logged in as ${adminUsername}!`});
        }
        else{
            res.status(500).send({message: `Unauthorized`});
        }
    }
})

export default router;