import fs from "fs/promises";
const filePath = './UsersInfo/users.JSON';

export async function fileReader() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const usersData = JSON.parse(data);
        return usersData["users"];
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}