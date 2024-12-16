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


export default router;