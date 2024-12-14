import {fileReader} from "./fileReaderUsers.js";
export let usersInfo;

export const initializeUsersInfo = async () => {
    try {
        usersInfo = await fileReader();
    } catch (error) {
        console.error('Failed to load User Info:', error);
    }
};