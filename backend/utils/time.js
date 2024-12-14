import axios from "axios";
const regTime = new RegExp(/(\d{2}:\d{2})/);

export async function getTime() {
    try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Berlin');
        const currentTime = response.data["datetime"];

        const match = currentTime.match(regTime);
        if (match) {
            const currentNewTime = match[0];
            return currentNewTime;
        } else {
            console.error('Error: Could not extract date from datetime string.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching time:', error.message);
        return null;
    }
}

