import {Router} from "express";
import fs from 'fs';


////TODO: try to figure out how to get to username value///
const filePath = './UsersInfo/admin.JSON';
const router = new Router();
let adminData;
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    adminData = JSON.parse(data);
    adminData = adminData["admin"][0];
})


const adminUsername = adminData;
//const adminPassword = adminData.password;
/*
router.post("/login", (req, res) => {
    const {username, password} = req.body;
    if (username === adminUsername && password === adminPassword) {
        res.status(200).send({message: 'Welcome to Attendance as an Admin!'});
    }
    else {
        res.status(401).send({message: 'Unauthorized'});
    }
})*/

router.get('/', (req, res) => {
    res.status(200).send({adminData});
});

export default router;