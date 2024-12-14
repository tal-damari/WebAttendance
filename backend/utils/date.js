import axios from "axios";

const regTime = new RegExp(/^\d{4}-\d{2}-\d{2}/);

export async function getDate() {
    try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Berlin');
        const currentTime = response.data["datetime"];

        const match = currentTime.match(regTime);
        if (match) {
            const currentDate = match[0];
            return currentDate;
        } else {
            console.error('Error: Could not extract date from datetime string.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching time:', error.message);
        return null;
    }
}
