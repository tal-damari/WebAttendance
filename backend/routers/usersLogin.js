import { Router } from "express";
import fs from "fs/promises";

const router = new Router();
const filePath = './UsersInfo/users.JSON';

//reading the object user from its file
async function fileReader() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const usersData = JSON.parse(data);
        return usersData["users"];
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

let usersInfo;

//asynchronous function because fileReader is an asynchronous function
const initializeUsersInfo = async () => {
    try {
        usersInfo = await fileReader();
        console.log('User Info loaded:', usersInfo);
    } catch (error) {
        console.error('Failed to load User Info:', error);
    }
};

await initializeUsersInfo();

//get check//
router.get('/', (req, res) => {

    if (usersInfo) {
        const username = usersInfo[0].username;
        res.status(200).send({ username });
    } else {
        res.status(500).send({ error: 'users info is unavailable' });
    }
});

//logging in with the user information//
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    for (let user of usersInfo) {
        console.log(user);
        if (user.username === username && user.password === password) {
            return res.status(200).send({ message: `You are logged in as ${user.username}` }); // Exit the function
        }
    }
    res.status(401).send({ message: `User is not created in the system` });
});

export default router;