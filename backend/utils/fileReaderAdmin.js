import fs from "fs/promises";
const filePath = './UsersInfo/admin.JSON';

export async function fileReader() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const adminData = JSON.parse(data);
        return adminData["admin"][0];
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}