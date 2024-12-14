import fs from 'fs/promises';

//TODO fix this function
export const addEntranceExit = async (username, date, time, usersInfo) => {
    try {
        const users = usersInfo.users; // Loaded object from initializeUsersInfo()
        console.log("this are users: " +users);
        console.log("this are usersInfo: " +usersInfo);
        const user = users.find(e => e.username === username);

        if (user) {
            user.attendance.push({ date, time });

            // Save the updated users info back to the JSON file
            await fs.writeFile('./path/to/users.JSON', JSON.stringify({ users }, null, 2), 'utf8');

            return user;
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
